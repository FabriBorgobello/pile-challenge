import { InvalidZodError, NotFoundError } from '@/utils/ApiError';
import { Account, balanceSchema } from './account.schema';
import { data } from './accounts.json';

const accounts: Account[] = data;

export async function getAccounts() {
  return {
    accounts,
    count: accounts.length,
    highestBalance: accounts.reduce((acc, account) => {
      return Math.max(acc, account.balances.available.value);
    }, 0),
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
