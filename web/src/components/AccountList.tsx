import { useErrorBoundary } from 'react-error-boundary';

import { UseAccounts } from '@/hooks/useAccounts';
import { Account } from '@/types';

import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Pagination } from './Pagination';

export function AccountList({ accounts, count, decrementOffset, incrementOffset, limit, offset, error }: UseAccounts) {
  const { showBoundary } = useErrorBoundary();
  if (error) showBoundary(error);

  return (
    <>
      {count === 0 ? (
        <p className="text-center text-black dark:text-white">No accounts found.</p>
      ) : (
        <>
          <p className="text-center text-black dark:text-white">
            Showing {offset + 1} - {offset + limit} of {count} accounts
          </p>
          <ul
            className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4 pr-4"
            data-testid="account-list"
          >
            {accounts.map((account: Account) => (
              <AccountItem key={account.id} account={account} />
            ))}
          </ul>
        </>
      )}

      {count > limit && (
        <Pagination
          count={count}
          decrementOffset={decrementOffset}
          incrementOffset={incrementOffset}
          limit={limit}
          offset={offset}
        />
      )}
    </>
  );
}

export function AccountListSkeleton() {
  return (
    <ul
      className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4"
      data-testid="account-list"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <AccountItemSkeleton key={index} />
      ))}
    </ul>
  );
}
