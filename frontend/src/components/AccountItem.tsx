import { Account } from '../types';

export function AccountItem({ account }: { account: Account }) {
  return (
    <li className="border rounded-lg p-4 flex flex-col gap-y-2 border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold dark:text-white text-black">{account.name}</p>
        <p className="rounded-full text-white px-2 py-1 text-xs dark:bg-white dark:text-black bg-black">
          🇪🇸 {account.country}
        </p>
      </div>
      <div className="flex justify-between items-center gap-x-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {account.balances.available.currency} {account.balances.available.value.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-400 max-w-1/2 truncate">{account.IBAN}</p>
      </div>
    </li>
  );
}

export function AccountItemSkeleton() {
  return (
    <li className="border rounded-lg p-4 flex flex-col gap-y-2 border-gray-200 dark:border-gray-800 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded-md w-1/3"></div> {/* Placeholder for account name */}
        <div className="h-6 bg-gray-300 rounded-full w-1/4"></div> {/* Placeholder for country badge */}
      </div>
      <div className="flex justify-between items-center gap-x-2">
        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div> {/* Placeholder for currency and value */}
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div> {/* Placeholder for IBAN */}
      </div>
    </li>
  );
}
