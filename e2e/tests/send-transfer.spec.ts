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
    await page.getByLabel('From').press('Tab');
    await page.getByLabel('Amount (€)').fill('0');
    await page.getByLabel('Amount (€)').press('Tab');
    await page.getByLabel('Recipient name').press('Tab');
    await page.getByLabel('IBAN').press('Tab');
    await page.getByLabel('BIC').press('Tab');
    await page.getByLabel('Reference').press('Tab');

    // Check for error messages
    await expect(page.getByText('Please select a source account')).toBeVisible();
    await expect(page.getByText('Must be at least 1')).toBeVisible();
    await expect(page.getByText('Please indicate a recipient')).toBeVisible();
    await expect(page.getByText('Must be 22 at least')).toBeVisible();
    await expect(page.getByText('Must be at least 8 characters')).toBeVisible();
    await expect(page.getByText('A reference is required')).toBeVisible();

    // Check that the form does not submit
    await page.getByTestId('sepa-form').getByRole('button', { name: 'Send' }).click();
    await expect(SEPAForm).toBeVisible();
  });
  test('sends valid data', async ({ page }) => {
    const validData = {
      from: '5f1b6eb7-885f-4f85-af57-a4694ab62eec',
      amount: 10000,
      recipientName: 'Jane Doe',
      IBAN: 'DE14500105177887447467',
      BIC: '12345678',
      reference: 'Food',
    };

    await page.getByRole('button', { name: 'Send money' }).click();
    await page.getByLabel('From').selectOption(validData.from);
    await page.getByLabel('Amount (€)').fill(validData.amount.toString());
    await page.getByLabel('Recipient name').fill(validData.recipientName);
    await page.getByLabel('IBAN').fill(validData.IBAN);
    await page.getByLabel('BIC').fill(validData.BIC);
    await page.getByLabel('Reference').fill(validData.reference);
    await page.getByTestId('sepa-form').getByRole('button', { name: 'Send' }).click();

    await expect(page.getByTestId('sepa-form')).not.toBeVisible();
    await expect(page.getByText('Transfer successful')).toBeVisible();
  });
});
