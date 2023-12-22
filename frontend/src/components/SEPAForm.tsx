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
import { useAccounts } from '../hooks/useAccounts';

const TRANSFER_DEFAULT_VALUES: TransferInsert = {
  source: '',
  amount: 1,
  recipient: '',
  targetIBAN: '',
  targetBIC: '',
  reference: '',
};

export default function SEPAForm() {
  const { data: accounts } = useAccounts();
  const { handleSubmit, register, formState } = useForm<TransferInsert>({
    defaultValues: TRANSFER_DEFAULT_VALUES,
    resolver: zodResolver(transferInsertSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: TransferInsert) => {
    console.log(data);
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
            {accounts.map((account) => (
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
          <Label htmlFor="recipient">Recipient name</Label>
          <Input type="text" id="recipient" error={Boolean(formState.errors.recipient)} {...register('recipient')} />
          {formState.errors.recipient && <ErrorMessage>{formState.errors.recipient.message}</ErrorMessage>}
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
