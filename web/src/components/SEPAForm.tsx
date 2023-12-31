import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export default function SEPAForm() {
  const queryClient = useQueryClient();
  const accounts = useTransferAccounts();
  const { closeModal } = useModal();

  /** React Hook Form methods */
  const { handleSubmit, register, formState, reset } = useForm<TransferInsert>({
    defaultValues,
    resolver,
    mode: 'onBlur',
  });
  const errors = formState.errors;

  /** Mutation to send the transfer */
  const mutation = useMutation({
    mutationFn: async (data: TransferInsert) => {
      const accountID = data.source;
      const res = await fetch(`${BASE_URL}/account/${accountID}/transfer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        switch (res.status) {
          case 400:
            throw new Error(`Invalid data: ${json.error ?? res.statusText}`);
          default:
            throw new Error(`Something went wrong: ${res.statusText}`);
        }
      }

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      closeModal();
      toast.success('Transfer successful', { duration: 5000 });
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });

  /**
   * Form submit handler
   * Validations that are not covered by the resolver are done here
   */
  const onSubmit = async (data: TransferInsert) => {
    // Check if the user has enough money in the account
    const availableBalance = accounts.find((account) => account.id === data.source)?.balances.available.value;
    if (availableBalance && data.amount > availableBalance) {
      toast.error("You don't have enough money in this account.");
      return;
    }

    mutation.mutate(data);
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
            <option disabled value="">
              Select an account
            </option>
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
          min={1}
          register={register('amount', { valueAsNumber: true, min: 1 })}
          step={0.01}
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
