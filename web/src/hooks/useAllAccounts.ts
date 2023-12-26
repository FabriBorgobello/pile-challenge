import { useEffect, useState } from 'react';
import { Account } from '../types';

export function useAllAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    async function getAccounts() {
      try {
        const response = await fetch(`http://localhost:3000/account`);
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
