export function Title(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props} className="text-3xl font-bold text-black dark:text-white" />;
}

export function Subtitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className="text-2xl font-bold text-black dark:text-white" />;
}

export function PrimaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="text-lg text-gray-700 dark:text-gray-300" />;
}

export function SecondaryText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="text-base text-gray-600 dark:text-gray-400" />;
}
