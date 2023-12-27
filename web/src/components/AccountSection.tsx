import { useAccount } from '@/hooks/useAccounts';
import { Account } from '@/types';

import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { FilterPopover } from './FilterPopover';
import { Pagination } from './Pagination';
import { PrimaryText, Subtitle } from './Typography';

export function AccountSection() {
  const { accounts, status } = useAccount();

  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle id="account-section">Accounts</Subtitle>
        <FilterPopover />
      </div>
      {status !== 'success' && <AccountListSkeleton />}
      {status === 'success' && accounts.length === 0 && <AccountListEmptyState />}
      {status === 'success' && accounts.length > 0 && <AccountList accounts={accounts} />}
      {accounts.length > 0 && <Pagination />}
    </div>
  );
}

function AccountListSkeleton() {
  return (
    <ul
      className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4"
      data-testid="account-list-skeleton"
    >
      {[...Array(6)].map((_, index) => (
        <AccountItemSkeleton key={index} />
      ))}
    </ul>
  );
}

function AccountListEmptyState() {
  return <PrimaryText className="py-6 text-center">No accounts found</PrimaryText>;
}

function AccountList({ accounts }: { accounts: Account[] }) {
  return (
    <ul
      className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4"
      data-testid="account-list"
    >
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </ul>
  );
}
