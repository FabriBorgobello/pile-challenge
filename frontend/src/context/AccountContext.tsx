import React, { createContext, useState, useEffect } from 'react';
import { Account, DataContextType, LoadingState } from '../types';

interface AccountResponse {
  accounts: Account[];
  count: number;
  highestBalance: number;
}

export const AccountContext = createContext<DataContextType<AccountResponse>>({
  data: null,
  state: 'idle',
  error: null,
  fetchData: () => {},
});

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    setState('loading');
    try {
      const response = await fetch('http://localhost:3000/account');
      const jsonAccounts = await response.json();
      setData(jsonAccounts);
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

  return (
    <AccountContext.Provider value={{ data, state, error, fetchData: fetchAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};
