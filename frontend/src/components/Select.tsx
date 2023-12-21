import clsx from 'clsx';
import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ error = false, ...props }, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className={clsx(
        'h-[34px] border border-gray-300 rounded-md shadow-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent',
        error && 'border-red-500',
      )}
    />
  );
});
