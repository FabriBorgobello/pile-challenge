export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-red-600" data-testid="error-message">
      {children}
    </p>
  );
}
