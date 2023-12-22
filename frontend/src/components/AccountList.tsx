import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Button } from './Button';
import { Subtitle } from './Typography';
import { useAccount } from '../hooks/useAccounts';

export function AccountList({ onOpenModal }: { onOpenModal: () => void }) {
  const { data: accounts, state } = useAccount();

  return (
    <div className="flex flex-col gap-y-4 overflow-y-hidden">
      <div className="flex justify-between items-center">
        <Subtitle>Accounts</Subtitle>
        <Button onClick={onOpenModal}>Send Money</Button>
      </div>
      <ul className="flex flex-col mt-4 gap-y-2 overflow-scroll max-h-svh">
        {accounts && state === 'success'
          ? accounts.map((account) => <AccountItem account={account} key={account.id} />)
          : Array.from({ length: 5 }).map((_, index) => <AccountItemSkeleton key={index} />)}
      </ul>
    </div>
  );
}
