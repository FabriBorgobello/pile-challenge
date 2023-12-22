import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className={clsx(
        'rounded-full px-4 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary'
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'bg-white text-black dark:bg-black dark:text-white',
        restProps.className
      )}
    />
  );
}
