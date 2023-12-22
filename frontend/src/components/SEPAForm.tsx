import { useForm } from 'react-hook-form';
import { formatCurrency } from '../utils';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';
import { SecondaryText, Subtitle } from './Typography';
import { TransferInsert } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferInsertSchema } from '../schemas/transfer.schema';
import { ErrorMessage } from './ErrorMessage';
import { useAccount } from '../hooks/useAccounts';
import { useModal } from '../hooks/useModal';
import { useBalance } from '../hooks/useBalance';
import toast from 'react-hot-toast';

const TRANSFER_DEFAULT_VALUES: TransferInsert = {
  source: '',
  amount: 1,
  recipientName: '',
  targetIBAN: '',
  targetBIC: '',
  reference: '',
};

export default function SEPAForm() {
  const { data, fetchData: fetchAccounts } = useAccount();
  const { fetchData: fetchBalance } = useBalance();

  const { closeModal } = useModal();
  const { handleSubmit, register, formState } = useForm<TransferInsert>({
    defaultValues: TRANSFER_DEFAULT_VALUES,
    resolver: zodResolver(transferInsertSchema),
    mode: 'onBlur',
  });

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
      fetchAccounts();
      fetchBalance();
      toast.success('Transfer successful', { duration: 5000 });
    } catch (error) {
      // Show error message
    }
  };

  return (
    <div className="flex flex-col gap-y-8 p-4 sm:p-8">
      <div>
        <Subtitle>SEPA bank transfer</Subtitle>
        <SecondaryText>Send money to any bank account in the EU.</SecondaryText>
      </div>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="source">From</Label>
          <Select id="source" error={Boolean(formState.errors.source)} {...register('source')}>
            {data?.accounts.map((account) => (
              <option key={account.id} value={account.id} className="flex justify-between">
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
            type="number"
            id="amount"
            min={1}
            error={Boolean(formState.errors.amount)}
            {...register('amount', { valueAsNumber: true })}
          />
          {formState.errors.amount && <ErrorMessage>{formState.errors.amount.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="recipientName">Recipient name</Label>
          <Input
            type="text"
            id="recipientName"
            error={Boolean(formState.errors.recipientName)}
            {...register('recipientName')}
          />
          {formState.errors.recipientName && <ErrorMessage>{formState.errors.recipientName.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="targetIBAN">IBAN</Label>
          <Input type="text" id="targetIBAN" error={Boolean(formState.errors.targetIBAN)} {...register('targetIBAN')} />
          {formState.errors.targetIBAN && <ErrorMessage>{formState.errors.targetIBAN.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="targetBIC">BIC</Label>
          <Input type="text" id="targetBIC" error={Boolean(formState.errors.targetBIC)} {...register('targetBIC')} />
          {formState.errors.targetBIC && <ErrorMessage>{formState.errors.targetBIC.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="reference">Reference</Label>
          <Input type="text" id="reference" error={Boolean(formState.errors.reference)} {...register('reference')} />
          {formState.errors.reference && <ErrorMessage>{formState.errors.reference.message}</ErrorMessage>}
        </div>

        <Button type="submit" className="last:mt-8" disabled={!formState.isDirty || formState.isSubmitting}>
          {formState.isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
}
