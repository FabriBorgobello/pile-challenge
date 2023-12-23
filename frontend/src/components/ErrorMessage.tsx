export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p data-testid="error-message" className="text-sm text-red-600">
      {children}
    </p>
  );
}
