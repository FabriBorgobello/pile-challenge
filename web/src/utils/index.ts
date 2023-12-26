/**
 * Format a number to currency
 * @param value number to be formatted
 * @param currency currency to be formatted
 * @returns formatted currency
 * @example
 * formatCurrency(1000, 'BRL') // R$ 1.000,00
 * formatCurrency(1000, 'USD') // US$ 1,000.00
 */
export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}
