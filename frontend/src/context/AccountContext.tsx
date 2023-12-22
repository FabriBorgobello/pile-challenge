import React, { createContext, useState, useEffect } from 'react';
import { Account, DataContextType, LoadingState } from '../types';

export const AccountContext = createContext<DataContextType<Account[]>>({
  data: null,
  state: 'idle',
  error: null,
  fetchData: () => {},
});

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    setState('loading');
    try {
      const response = await fetch('http://localhost:3000/account');
      const jsonAccounts = await response.json();
      setAccounts(jsonAccounts);
      setState('success');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setState('error');
      }
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return <AccountContext.Provider value={{ data: accounts, state, error }}>{children}</AccountContext.Provider>;
};
