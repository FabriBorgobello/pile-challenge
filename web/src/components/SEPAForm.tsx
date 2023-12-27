import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError, useForm, UseFormRegisterReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useModal } from '@/hooks/useModal';
import { useTransferAccounts } from '@/hooks/useTransferAccounts';
import { transferInsertSchema } from '@/schemas/transfer.schema';
import { TransferInsert } from '@/types';
import { formatCurrency } from '@/utils';

import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';
import { SecondaryText, Subtitle } from './Typography';

/**
 * Default values for the form
 * @note This is not necessary but it's a good practice to have default values for the form
 * @see https://www.react-hook-form.com/api/useform/#defaultValues
 */
const defaultValues: TransferInsert = {
  source: '',
  amount: 1,
  recipient: '',
  targetIBAN: '',
  targetBIC: '',
  reference: '',
};

/**
 * Form resolver
 * It's used to validate the form using external schemas (Zod in this case)
 * @see https://react-hook-form.com/docs/useform#resolver
 */
const resolver = zodResolver(transferInsertSchema);

export default function SEPAForm() {
  const accounts = useTransferAccounts();
  const { closeModal } = useModal();
  const { handleSubmit, register, formState } = useForm<TransferInsert>({ defaultValues, resolver, mode: 'onBlur' });
  const errors = formState.errors;

  const onSubmit = async (data: TransferInsert) => {
    try {
      const res = await fetch('http://localhost:3000/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      closeModal();
      toast.success('Transfer successful', { duration: 5000 });
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
    }
  };
  return (
    <div className="flex flex-col gap-y-8 p-4 sm:p-8" data-testid="sepa-form">
      <div>
        <Subtitle>SEPA bank transfer</Subtitle>
        <SecondaryText>Send money to any bank account in the EU.</SecondaryText>
      </div>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="source">From</Label>
          <Select error={Boolean(errors.source)} id="source" {...register('source')}>
            {accounts.map((account) => (
              <option key={account.id} className="flex justify-between" value={account.id}>
                {account.name} - (
                {formatCurrency(account.balances.available.value, account.balances.available.currency)})
              </option>
            ))}
          </Select>
          {errors.source && <ErrorMessage>{errors.source.message}</ErrorMessage>}
        </div>
        <FormInput
          error={errors.amount}
          id="amount"
          label="Amount (€)"
          register={register('amount', { valueAsNumber: true, min: 1 })}
          type="number"
        />
        <FormInput error={errors.recipient} id="recipient" label="Recipient name" register={register('recipient')} />
        <FormInput error={errors.targetIBAN} id="targetIBAN" label="IBAN" register={register('targetIBAN')} />
        <FormInput error={errors.targetBIC} id="targetBIC" label="BIC" register={register('targetBIC')} />
        <FormInput error={errors.reference} id="reference" label="Reference" register={register('reference')} />
        <Button className="last:mt-8" disabled={!formState.isDirty || formState.isSubmitting} type="submit">
          {formState.isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn<keyof TransferInsert>;
  error: FieldError | undefined;
}

function FormInput({ label, register, error, ...rest }: FormInputProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <Label htmlFor={rest.id}>{label}</Label>
      <Input error={Boolean(error)} {...rest} {...register} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
