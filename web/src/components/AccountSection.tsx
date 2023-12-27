import { lazy,Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AccountListSkeleton } from './AccountList';
import { ErrorFallback } from './ErrorComponent';
import { FilterPopover } from './FilterPopover';
import { Subtitle } from './Typography';

const AccountList = lazy(() => import('./AccountList'));

export function AccountSection() {
  return (
    <div className="flex flex-col gap-y-2 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <Subtitle id="account-section">Accounts</Subtitle>
        <FilterPopover />
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<AccountListSkeleton />}>
          <AccountList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
