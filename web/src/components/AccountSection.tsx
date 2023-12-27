import { ErrorBoundary } from 'react-error-boundary';

import { useAccounts } from '@/hooks/useAccounts';

import { AccountList, AccountListSkeleton } from './AccountList';
import { ErrorFallback } from './ErrorComponent';
import { FilterPopover } from './FilterPopover';
import { Subtitle } from './Typography';

export function AccountSection() {
  const accountsData = useAccounts();

  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle id="account-section">Accounts</Subtitle>
        <ErrorBoundary fallback={null}>
          <FilterPopover
            balanceRange={accountsData.balanceRange}
            highestBalance={accountsData.highestBalance}
            setBalanceRange={accountsData.setBalanceRange}
          />
        </ErrorBoundary>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {accountsData.isLoading ? <AccountListSkeleton /> : <AccountList {...accountsData} />}
      </ErrorBoundary>
    </div>
  );
}
