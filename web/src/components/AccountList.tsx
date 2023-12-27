import { useAccounts } from '@/hooks/useAccounts';
import { Account } from '@/types';

import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Pagination } from './Pagination';

export default function AccountList() {
  const { accounts, count, limit, offset, incrementOffset, decrementOffset } = useAccounts();

  return (
    <>
      <ul
        className="mt-4 flex max-h-[600px] flex-col gap-y-4 overflow-y-scroll rounded-md pb-4"
        data-testid="account-list"
      >
        {accounts.map((account: Account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </ul>
      {count > 0 && (
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
