import { clsx } from 'clsx';

export function Title(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} className={clsx('text-3xl font-bold text-black sm:text-5xl dark:text-white', props.className)} />
  );
}

export function Subtitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className={clsx('text-2xl font-bold text-black dark:text-white', props.className)} />;
}

export function PrimaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={clsx('text-lg text-gray-800 dark:text-gray-300', props.className)} />;
}

export function SecondaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={clsx('text-base text-gray-600 dark:text-gray-400', props.className)} />;
}
