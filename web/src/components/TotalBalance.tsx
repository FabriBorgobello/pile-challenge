import { clsx } from 'clsx';

import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils';

export function TotalBalance() {
  const { data: balance, state } = useBalance();

  const isLoading = state === 'loading' || !balance;

  return (
    <div
      className={clsx(
        'relative flex flex-col gap-y-1 overflow-hidden rounded-md border border-gray-200 bg-white px-5 py-8 sm:pl-8 dark:border-gray-800 dark:bg-gray-800',
        isLoading && 'animate-pulse'
      )}
    >
      <div className="absolute bottom-0 left-0 h-2 w-full bg-indigo-700 sm:left-0 sm:top-0 sm:h-full sm:w-2"></div>
      <h2 className="text-center text-black opacity-80 sm:text-left  dark:text-white">
        Total balance
        {!isLoading ? (
          <span className="ml-1 hidden text-xs opacity-80 sm:inline">(accross 0 accounts)</span>
        ) : (
          <span className="ml-1 text-xs opacity-80 sm:inline">(accross {balance?.count} accounts)</span>
        )}
      </h2>
      {!isLoading ? (
        <p
          className="text-center text-[1.5rem] font-bold text-black sm:text-left  sm:text-4xl dark:text-white"
          data-testid="total-balance"
        >
          {balance && formatCurrency(balance.balance, balance.currency)}
        </p>
      ) : (
        <div className="h-10 w-1/2 rounded-md bg-gray-300" data-testid="total-balance-skeleton"></div>
      )}
    </div>
  );
}
