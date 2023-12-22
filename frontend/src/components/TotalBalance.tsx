import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils';

export function TotalBalance() {
  const { data: balance, state } = useBalance();

  if (state !== 'success' || !balance) {
    return <BalanceSkeleton />;
  }

  return (
    <div className="flex flex-col text-center sm:text-left gap-y-1 bg-black dark:bg-white rounded-xl p-4">
      <h2 className="text-white dark:text-black">Total balance</h2>
      <p className="text-white text-3xl sm:text-4xl dark:text-black">
        {balance && formatCurrency(balance.balance, balance.currency)}
      </p>
    </div>
  );
}

function BalanceSkeleton() {
  return (
    <div className="flex flex-col text-center sm:text-left gap-y-1 bg-black dark:bg-white rounded-xl p-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded-md w-1/3 self-center sm:self-start"></div>
      <div className="h-10 bg-gray-300 rounded-md w-full"></div>
    </div>
  );
}
