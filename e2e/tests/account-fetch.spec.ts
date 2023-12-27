import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Account fetch and paginaton', () => {
  test('renders UI correctly', async ({ page }) => {
    // Static content
    await expect(page.getByRole('heading', { name: 'Welcome back, John!' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My Fintech' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send money' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();

    // Dynamic content
    await expect(page.getByTestId('total-balance')).toBeVisible();
    await expect(page.getByTestId('account-list')).toBeVisible();
  });

  test('displays empty state when no accounts are found', async ({ page }) => {
    // Mock the API response
    await page.route('http://localhost:3000/account**', async (route) => {
      await route.fulfill({
        json: { accounts: [], highestBalance: 0, count: 0 },
      });
    });

    await page.reload();
    await expect(page.getByTestId('account-list')).not.toBeVisible();
    await expect(page.getByTestId('account-list-skeleton')).not.toBeVisible();
    await expect(page.getByTestId('account-empty-state')).toBeVisible();
  });

  test('displays an error when the API fails', async ({ page }) => {
    // Mock the API response
    const ERROR_MESSAGE = 'Not found';
    await page.route('http://localhost:3000/account**', async (route) => {
      await route.fulfill({ status: 404, contentType: 'text/plain', body: ERROR_MESSAGE });
    });
    await page.reload();
    const errorFallback = page.getByTestId('error-fallback');
    await expect(errorFallback).toBeVisible();
    await expect(errorFallback).toContainText(ERROR_MESSAGE);
  });

  test('account fetch and pagination', async ({ page }) => {
    // Test for initial fetch
    await expect(page.getByTestId('account-list-skeleton')).not.toBeVisible();
    await expect(page.getByTestId('account-list')).toBeVisible();
    const firstPage = await page.getByTestId('account-item-name').all();
    const firstPageNames = await Promise.all(firstPage.map((el) => el.innerText()));

    // Test pagination
    const prevButton = page.getByRole('button', { name: 'Previous' });
    const nextButton = page.getByRole('button', { name: 'Next' });
    const pageInfo = page.getByTestId('page-info');
    // Check for initial state
    await expect(pageInfo).toContainText('Page 1 of 5');
    await expect(prevButton).toBeDisabled();
    await nextButton.click();
    // Check for next page
    const secondPage = await page.getByTestId('account-item-name').all();
    const secondPageNames = await Promise.all(secondPage.map((el) => el.innerText()));
    expect(firstPageNames).not.toEqual(secondPageNames);
    await expect(prevButton).toBeEnabled();
    await expect(pageInfo).toContainText('Page 2 of 5');
  });
});

test.describe('Filtering', () => {
  test('filter by balance', async ({ page }) => {
    // Open filter popover
    await page.getByRole('button', { name: 'Filter' }).click();
    const filterPopover = page.getByTestId('filter-popover');
    await expect(filterPopover).toBeVisible();

    // Adjust the minimum balance to the 50% of the maximum balance
    const slider = page.getByTestId('filter-account-balance-slider');
    const sliderLength = await slider.evaluate((el) => el.getBoundingClientRect().width);
    slider.click({ position: { x: sliderLength * 0.5, y: 0 } });
    await page.waitForTimeout(500); // Wait for 0.5s for the slider to update
    const maxBalance = Number((await page.getByTestId('max-balance').innerText()).slice(1).replace(',', ''));

    // Apply filter
    await page.getByRole('button', { name: 'Apply' }).click();

    // Check for filter applied message and filter popover to be closed
    await expect(page.getByText('Filter applied')).toBeVisible();
    await expect(filterPopover).not.toBeVisible();

    // Check for all accounts to have a balances in the range
    const minBalance = Math.round(maxBalance * 0.5);
    const balanceList = await page.getByTestId('account-item-balance').all();
    for (const balance of balanceList) {
      const balanceValue = Number((await balance.innerText()).slice(4));
      expect(balanceValue).toBeGreaterThanOrEqual(minBalance);
      expect(balanceValue).toBeLessThanOrEqual(maxBalance);
    }
  });
});
