import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Utility function to complete the SEPA form and submit it
async function completeSEPAForm(page: Page, data: Record<string, any>) {
  await page.getByRole('button', { name: 'Send money' }).click();
  await page.getByLabel('From').selectOption(data.from);
  await page.getByLabel('Amount (€)').fill(data.amount.toString());
  await page.getByLabel('Recipient name').fill(data.recipientName);
  await page.getByLabel('IBAN').fill(data.IBAN);
  await page.getByLabel('BIC').fill(data.BIC);
  await page.getByLabel('Reference').fill(data.reference);
  await page.getByTestId('sepa-form').getByRole('button', { name: 'Send' }).click();
}

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
    await completeSEPAForm(page, {
      from: '5f1b6eb7-885f-4f85-af57-a4694ab62eec',
      amount: 10000,
      recipientName: 'Jane Doe',
      IBAN: 'DE14500105177887447467',
      BIC: '12345678',
      reference: 'Food',
    });

    await expect(page.getByTestId('sepa-form')).not.toBeVisible();
    await expect(page.getByText('Transfer successful')).toBeVisible();
  });

  test('displays an error message in case of failure', async ({ page }) => {
    // Mock the API response to return an error
    await page.route('http://localhost:3000/transfer**', async (route) => {
      await route.fulfill({
        json: { error: 'Insufficient funds' },
        status: 400,
      });
    });
    await page.reload();

    await completeSEPAForm(page, {
      from: '5f1b6eb7-885f-4f85-af57-a4694ab62eec',
      amount: 10000,
      recipientName: 'Jane Doe',
      IBAN: 'DE14500105177887447467',
      BIC: '12345678',
      reference: 'Food',
    });

    await expect(page.getByText('Invalid data: Insufficient funds')).toBeVisible();
  });
});
