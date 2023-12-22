import { useAccount } from '../hooks/useAccounts';
import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { FilterPopover } from './FilterPopover';
import { Pagination } from './Pagination';
import { Subtitle } from './Typography';

export function AccountSection() {
  const { accounts, status } = useAccount();

  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle id="account-section">Accounts</Subtitle>
        <FilterPopover />
      </div>
      {status !== 'success' && <SkeletonList />}
      <ul className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.id} />
        ))}
      </ul>
      <Pagination />
    </div>
  );
}

function SkeletonList() {
  return (
    <ul className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4">
      {[...Array(6)].map((_, index) => (
        <AccountItemSkeleton key={index} />
      ))}
    </ul>
  );
}
