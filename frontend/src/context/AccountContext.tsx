import React, { createContext, useState, useEffect } from 'react';
import { Account, DataContextType, LoadingState } from '../types';
import { AccountQuery } from '../schemas/accountFilters.schema';

interface AccountResponse {
  accounts: Account[];
  count: number;
  highestBalance: number;
}

export const AccountContext = createContext<DataContextType<AccountResponse, AccountQuery>>({
  data: null,
  state: 'idle',
  error: null,
  fetchData: () => new Promise(() => {}),
});

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async (query: AccountQuery = {}) => {
    setState('loading');
    try {
      const urlParams = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]));
      const response = await fetch(`http://localhost:3000/account?${urlParams}`);
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
