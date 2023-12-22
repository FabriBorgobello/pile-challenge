import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Subtitle } from './Typography';
import { useAccount } from '../hooks/useAccounts';
import { Button } from './Button';

export function AccountList() {
  const { data: accounts, state } = useAccount();

  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle>Accounts</Subtitle>
        <Button variant="text">Filter</Button>
      </div>
      <ul className="mt-4 flex max-h-svh flex-col gap-y-4 overflow-scroll rounded-md pb-4">
        {accounts && state === 'success'
          ? accounts.map((account) => <AccountItem account={account} key={account.id} />)
          : Array.from({ length: 5 }).map((_, index) => <AccountItemSkeleton key={index} />)}
      </ul>
    </div>
  );
}
