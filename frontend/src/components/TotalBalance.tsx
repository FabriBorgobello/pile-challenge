import { useBalance } from '../hooks/useBalance';
import { formatCurrency } from '../utils';

export function TotalBalance() {
  const { data: balance, state } = useBalance();

  if (state !== 'success' || !balance) {
    return <BalanceSkeleton />;
  }

  return (
    <div className="flex flex-col gap-y-1 rounded-xl bg-black p-4 text-center sm:text-left dark:bg-white">
      <h2 className="text-white dark:text-black">Total balance</h2>
      <p className="text-3xl text-white sm:text-4xl dark:text-black">
        {balance && formatCurrency(balance.balance, balance.currency)}
      </p>
    </div>
  );
}

function BalanceSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-y-1 rounded-xl bg-black p-4 text-center sm:text-left dark:bg-white">
      <div className="h-6 w-1/3 self-center rounded-md bg-gray-300 sm:self-start"></div>
      <div className="h-10 w-full rounded-md bg-gray-300"></div>
    </div>
  );
}
