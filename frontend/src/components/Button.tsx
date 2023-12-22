import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

export function Button({ variant = 'primary', ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className={clsx(
        'rounded-full border-[1px] border-opacity-20 px-4 py-2 transition-all focus:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && ' border-indigo-700 bg-indigo-700 text-white hover:bg-indigo-800',
        variant === 'secondary' && ' border-indigo-700 bg-white text-indigo-700 hover:bg-indigo-50',
        variant === 'text' &&
          'border-none text-black underline hover:border-indigo-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800',
        restProps.className
      )}
    />
  );
}
