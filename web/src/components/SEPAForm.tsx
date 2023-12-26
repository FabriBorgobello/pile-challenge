import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAllAccounts } from '../hooks/useAllAccounts';
import { useModal } from '../hooks/useModal';
import { transferInsertSchema } from '../schemas/transfer.schema';
import { TransferInsert } from '../types';
import { formatCurrency } from '../utils';
import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';
import { SecondaryText, Subtitle } from './Typography';

const TRANSFER_DEFAULT_VALUES: TransferInsert = {
  source: '',
  amount: 1,
  recipientName: '',
  targetIBAN: '',
  targetBIC: '',
  reference: '',
};

export default function SEPAForm() {
  const accounts = useAllAccounts();

  const { closeModal } = useModal();
  const { handleSubmit, register, formState } = useForm<TransferInsert>({
    defaultValues: TRANSFER_DEFAULT_VALUES,
    resolver: zodResolver(transferInsertSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: TransferInsert) => {
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
          <Select error={Boolean(formState.errors.source)} id="source" {...register('source')}>
            {accounts.map((account) => (
              <option key={account.id} className="flex justify-between" value={account.id}>
                {account.name} - (
                {formatCurrency(account.balances.available.value, account.balances.available.currency)})
              </option>
            ))}
          </Select>
          {formState.errors.source && <ErrorMessage>{formState.errors.source.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-y-1">
          <Label htmlFor="amount">Amount (€)</Label>
          <Input
            error={Boolean(formState.errors.amount)}
            id="amount"
            min={1}
            type="number"
            {...register('amount', { valueAsNumber: true })}
          />
          {formState.errors.amount && <ErrorMessage>{formState.errors.amount.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="recipientName">Recipient name</Label>
          <Input
            error={Boolean(formState.errors.recipientName)}
            id="recipientName"
            type="text"
            {...register('recipientName')}
          />
          {formState.errors.recipientName && <ErrorMessage>{formState.errors.recipientName.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="targetIBAN">IBAN</Label>
          <Input error={Boolean(formState.errors.targetIBAN)} id="targetIBAN" type="text" {...register('targetIBAN')} />
          {formState.errors.targetIBAN && <ErrorMessage>{formState.errors.targetIBAN.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="targetBIC">BIC</Label>
          <Input error={Boolean(formState.errors.targetBIC)} id="targetBIC" type="text" {...register('targetBIC')} />
          {formState.errors.targetBIC && <ErrorMessage>{formState.errors.targetBIC.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="reference">Reference</Label>
          <Input error={Boolean(formState.errors.reference)} id="reference" type="text" {...register('reference')} />
          {formState.errors.reference && <ErrorMessage>{formState.errors.reference.message}</ErrorMessage>}
        </div>

        <Button className="last:mt-8" disabled={!formState.isDirty || formState.isSubmitting} type="submit">
          {formState.isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
}
