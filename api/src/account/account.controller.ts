import { InvalidZodError, NotFoundError } from '@/utils/ApiError';
import { Account, AccountFilter, balanceSchema } from './account.schema';
import { data } from './accounts.json';

const accounts: Account[] = data;

export async function getAccounts({ minBalance, maxBalance, limit, offset }: AccountFilter) {
  // Filter accounts based on balance criteria
  const filteredAccounts = data.filter((account) => {
    const balance = account.balances.available.value;
    return balance >= minBalance && balance <= maxBalance;
  });

  // Implement pagination
  const paginatedAccounts = filteredAccounts.slice(offset, offset + limit);

  // Calculate highest balance (consider doing this once as a separate operation if data changes infrequently)
  const highestBalance = data.reduce((acc, account) => {
    return Math.max(acc, account.balances.available.value);
  }, 0);

  return {
    accounts: paginatedAccounts,
    highestBalance,
    count: filteredAccounts.length, // total count of filtered accounts
  };
}

export async function updateBalance(id: Account['id'], balance: number) {
  // Validate balance according to our predefined schema
  const safeBalance = balanceSchema.safeParse(balance);
  if (!safeBalance.success) {
    throw new InvalidZodError(safeBalance.error);
  }
  // Query the database for the account
  const account = accounts.find((a) => a.id === id);
  if (!account) {
    throw new NotFoundError(`Account ${id} not found`);
  }

  account.balances.available.value = Number(safeBalance.data.toFixed(2));
  return account;
}

export async function getBalance() {
  const total = accounts.reduce((acc, account) => {
    return acc + account.balances.available.value;
  }, 0);
  return { balance: total, currency: 'EUR', count: accounts.length };
}
