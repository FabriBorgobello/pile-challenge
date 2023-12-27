import { useEffect, useState } from 'react';

import { Account } from '@/types';

const BASE_URL = import.meta.env.API_BASE_URL ?? 'http://localhost:3000';

export function useTransferAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    async function getAccounts() {
      try {
        // NOTE: This is a hack to get all accounts. In a real app, you'd want to implement some sort of pagination strategy.
        // e.g. infinite scrolling, "load more" button, search, etc.
        const response = await fetch(`${BASE_URL}/account?limit=${Number.MAX_SAFE_INTEGER}`);
        const data = await response.json();
        setAccounts(data.accounts);
      } catch (error) {
        console.error(error);
      }
    }
    getAccounts();
  }, []);

  return accounts;
}
