import { clsx } from 'clsx';

import { useBalance } from '@/hooks/useBalance';
import { formatCurrency } from '@/utils';

export default function TotalBalance() {
  const { data } = useBalance();

  return (
    <div
      className={clsx(
        'relative flex flex-col gap-y-1 overflow-hidden rounded-md border border-gray-200 bg-white px-5 py-8 sm:pl-8 dark:border-gray-800 dark:bg-gray-800'
      )}
    >
      <div className="absolute bottom-0 left-0 h-2 w-full bg-indigo-700 sm:left-0 sm:top-0 sm:h-full sm:w-2"></div>
      <h2 className="text-center text-black opacity-80 sm:text-left  dark:text-white">
        Total balance
        <span className="ml-1 text-xs opacity-80 sm:inline">(accross {data?.count} accounts)</span>
      </h2>
      <p
        className="text-center text-[1.5rem] font-bold text-black sm:text-left  sm:text-4xl dark:text-white"
        data-testid="total-balance"
      >
        {data && formatCurrency(data.balance, data.currency)}
      </p>
    </div>
  );
}
