import { useEffect, useState } from 'react';
import { Balance } from '../types';

export function useBalance() {
  const [data, setData] = useState<Balance>();
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  async function fetchBalance() {
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:3000/account/balance');
      const data = await response.json();
      setData(data);
      setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('Unknown error'));
      }
      setStatus('error');
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return { data, error, status };
}
