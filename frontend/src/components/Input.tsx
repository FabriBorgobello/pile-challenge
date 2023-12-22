import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error = false, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={clsx(
        'rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-950',
        error && 'border-red-500'
      )}
    />
  );
});
