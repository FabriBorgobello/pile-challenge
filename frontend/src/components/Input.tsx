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
        'border border-gray-300 rounded-md shadow-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent',
        error && 'border-red-500',
      )}
    />
  );
});
