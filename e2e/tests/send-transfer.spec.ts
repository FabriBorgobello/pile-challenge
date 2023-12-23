import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test.describe('SEPA transfers', () => {
  test('avoids sending invalid data', async ({ page }) => {
    await page.getByRole('button', { name: 'Send money' }).click();
    const SEPAForm = page.getByTestId('sepa-form');
    await expect(SEPAForm).toBeVisible();
    await expect(SEPAForm.getByRole('button', { name: 'Send' })).toBeDisabled();

    // Navigate the form adding invalid data
    await page.getByLabel('Amount (€)').fill('0');
    await page.getByLabel('Amount (€)').press('Tab');
    await page.getByLabel('Recipient name').press('Tab');
    await page.getByLabel('IBAN').press('Tab');
    await page.getByLabel('BIC').press('Tab');
    await page.getByLabel('Reference').press('Tab');

    // Check for error messages
    await expect(page.getByText('Must be at least 1')).toBeVisible();
    await expect(page.getByText('Please indicate a recipient')).toBeVisible();
    await expect(page.getByText('Must be 22 at least')).toBeVisible();
    await expect(page.getByText('Must be at least 8 characters')).toBeVisible();
    await expect(page.getByText('A reference is required')).toBeVisible();

    // Check that the form does not submit
    await page.getByTestId('sepa-form').getByRole('button', { name: 'Send' }).click();
    await expect(SEPAForm).toBeVisible();
  });
  test('sends valid data', async ({ page }) => {});
});
