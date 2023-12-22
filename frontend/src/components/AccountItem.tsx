import { Account } from '../types';

export function AccountItem({ account }: { account: Account }) {
  return (
    <li className="flex flex-col gap-y-2 border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-black dark:text-white">{account.name}</p>
        <p className="flex gap-x-1 rounded-full bg-indigo-700 px-2 py-1 text-xs text-white">
          <span>🇪🇸</span>
          <span>{account.country}</span>
        </p>
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {account.balances.available.currency} {account.balances.available.value.toFixed(2)}
        </p>
        <p className="text-muted-foreground max-w-1/2 truncate text-sm dark:text-gray-400">{account.IBAN}</p>
      </div>
    </li>
  );
}

export function AccountItemSkeleton() {
  return (
    <li className="flex animate-pulse flex-col gap-y-2 border border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/3 rounded-md bg-gray-300"></div>
        <div className="h-6 w-1/4 rounded-full bg-gray-300"></div>
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <div className="h-4 w-1/4 rounded-md bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
      </div>
    </li>
  );
}
