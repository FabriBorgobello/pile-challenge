import { DataBase } from '@/database';
import { NotFoundError } from '@/utils/ApiError';

import { Account, AccountFilter, TransferCreate } from './account.schema';

const db = new DataBase();

export async function getAccounts(filter: AccountFilter) {
  const { minBalance, maxBalance, limit, offset } = filter;

  const filteredAccounts = db.getFilteredAccounts(minBalance, maxBalance);
  const paginatedAccounts = db.getPaginatedAccounts(filteredAccounts, limit, offset);

  return {
    accounts: paginatedAccounts,
    highestBalance: db.getHighestBalance(),
    count: filteredAccounts.length,
  };
}

export async function transfer(id: Account['id'], transfer: TransferCreate) {
  const account = db.transfer(id, transfer.amount);

  console.log('\x1b[32m%s\x1b[0m', `✅ Transfer ${transfer.amount} from account ${id}`, '\x1b[0m');
  console.log(transfer);

  return account;
}

export async function getBalance() {
  return {
    balance: db.getTotalBalance(),
    currency: 'EUR',
    count: db.getAccounts().length,
  };
}

export async function getAccount(id: Account['id']) {
  const account = db.getAccount(id);
  if (!account) {
    throw new NotFoundError(`Account ${id} not found`);
  }
  return account;
}
