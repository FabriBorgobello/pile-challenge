import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className={clsx(
        'px-4 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary'
          ? 'dark:bg-white dark:text-black bg-black text-white'
          : 'dark:bg-black dark:text-white bg-white text-black',
        restProps.className,
      )}
    />
  );
}
