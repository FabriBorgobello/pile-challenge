import { Account } from '../types';

export function AccountItem({ account }: { account: Account }) {
  return (
    <li className="flex flex-col gap-y-2 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-black dark:text-white">{account.name}</p>
        <p className="rounded-full bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black">
          🇪🇸 {account.country}
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
    <li className="flex animate-pulse flex-col gap-y-2 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/3 rounded-md bg-gray-300"></div> {/* Placeholder for account name */}
        <div className="h-6 w-1/4 rounded-full bg-gray-300"></div> {/* Placeholder for country badge */}
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <div className="h-4 w-1/4 rounded-md bg-gray-300"></div> {/* Placeholder for currency and value */}
        <div className="h-4 w-1/2 rounded-md bg-gray-300"></div> {/* Placeholder for IBAN */}
      </div>
    </li>
  );
}
