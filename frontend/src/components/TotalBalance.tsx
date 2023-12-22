import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils';

export function TotalBalance() {
  const { data: balance, state } = useBalance();

  if (state !== 'success' || !balance) {
    return <BalanceSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-md border border-gray-200 bg-white px-5 py-8 sm:pl-8 dark:border-gray-700 dark:bg-gray-800">
      <div className="absolute bottom-0 left-0 h-2 w-full bg-indigo-700 sm:left-0 sm:top-0 sm:h-full sm:w-2"></div>
      <h2 className="text-center text-black opacity-80 sm:text-left  dark:text-white">
        Total balance
        <span className="ml-1 hidden  text-xs opacity-80 sm:inline ">(accross {balance.count} accounts)</span>
      </h2>
      <p className="text-center text-[1.5rem] font-bold text-black sm:text-left  sm:text-4xl dark:text-white">
        {balance && formatCurrency(balance.balance, balance.currency)}
      </p>
    </div>
  );
}

function BalanceSkeleton() {
  return (
    <div className="flex animate-pulse flex-col  gap-y-1 rounded-xl border border-gray-200 bg-black p-4 text-center sm:text-left dark:bg-white">
      <div className="h-6 w-1/3 self-center rounded-md bg-gray-300 sm:self-start"></div>
      <div className="h-10 w-full rounded-md bg-gray-300"></div>
    </div>
  );
}
