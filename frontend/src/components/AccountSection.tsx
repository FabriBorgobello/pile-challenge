import { useAccount } from '../hooks/useAccounts';
import { AccountItem } from './AccountItem';
import { FilterPopover } from './FilterPopover';
import { Pagination } from './Pagination';
import { Subtitle } from './Typography';

export function AccountSection() {
  const { accounts, loading, error } = useAccount();

  if (loading === 'pending') return <p>Loading...</p>;
  if (loading === 'error') return <p>Error loading accounts: {error?.message}</p>;

  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle>Accounts</Subtitle>
        <FilterPopover />
      </div>
      <ul className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.id} />
        ))}
      </ul>
      <Pagination />
    </div>
  );
}
