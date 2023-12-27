import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-screen w-full rounded-lg border border-gray-200 p-6 text-center shadow-lg dark:border-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">There was an error :(</h2>
        <pre className="mb-4 mt-2 whitespace-pre-wrap rounded bg-red-100 p-3 text-red-700">{error.message}</pre>
        <p className="text-gray-800 dark:text-gray-200">
          Try refreshing the page. If the problem persists, contact support.
        </p>
      </div>
    </div>
  );
}
