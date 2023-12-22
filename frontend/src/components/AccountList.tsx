import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Button } from './Button';
import { Subtitle } from './Typography';
import { useAccount } from '../hooks/useAccounts';
import { useModal } from '../hooks/useModal';

export function AccountList() {
  const { openModal } = useModal();
  const { data: accounts, state } = useAccount();

  return (
    <div className="flex flex-col gap-y-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle>Accounts</Subtitle>
        <Button onClick={openModal}>Send Money</Button>
      </div>
      <ul className="mt-4 flex max-h-svh flex-col gap-y-2 overflow-scroll">
        {accounts && state === 'success'
          ? accounts.map((account) => <AccountItem account={account} key={account.id} />)
          : Array.from({ length: 5 }).map((_, index) => <AccountItemSkeleton key={index} />)}
      </ul>
    </div>
  );
}
