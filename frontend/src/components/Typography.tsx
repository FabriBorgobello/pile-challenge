export function Title(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-3xl font-bold text-black sm:text-5xl dark:text-white" {...props} />;
}

export function Subtitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-2xl font-bold text-black dark:text-white" {...props} />;
}

export function PrimaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-lg text-gray-800 dark:text-gray-300" {...props} />;
}

export function SecondaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-base text-gray-600 dark:text-gray-400" {...props} />;
}
