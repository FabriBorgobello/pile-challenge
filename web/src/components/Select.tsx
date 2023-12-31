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
        'h-[34px] rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-950',
        error && 'border-red-500'
      )}
    />
  );
});

Select.displayName = 'Select';
