import { Account } from '@/account/account.schema';
import { BadRequestError } from '@/utils/ApiError';

import { data } from './accounts.json';

export class DataBase {
  private accounts: Account[] = [];

  constructor() {
    this.accounts = data;
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  getTotalBalance(): number {
    return this.accounts.reduce((total, account) => total + account.balances.available.value, 0);
  }

  getHighestBalance(): number {
    return this.accounts.reduce((highest, account) => Math.max(highest, account.balances.available.value), 0);
  }

  transfer(id: Account['id'], amount: number): Account {
    const account = this.getAccount(id);
    if (!account) throw new Error(`Account ${id} not found`);

    if (account.balances.available.value - amount < 0) {
      throw new BadRequestError('Insufficient balance for withdrawal');
    }

    account.balances.available.value -= amount;

    // NOTE: Logic to update the recipient account balance should be here

    return account;
  }

  getFilteredAccounts(minBalance: number, maxBalance: number): Account[] {
    return this.accounts.filter((account) => {
      const balance = account.balances.available.value;
      return balance >= minBalance && balance <= maxBalance;
    });
  }

  getPaginatedAccounts(accounts: Account[], limit: number, offset: number): Account[] {
    return accounts.slice(offset, offset + limit);
  }
}
