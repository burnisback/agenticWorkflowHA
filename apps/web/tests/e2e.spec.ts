import { test, expect } from '@playwright/test';

// Basic smoke test to ensure the dashboard page renders and navigation works.
test('dashboard and navigation flow', async ({ page }) => {
  // Navigate to the root (dashboard)
  await page.goto('/');
  // Expect the dashboard greeting to show
  await expect(page.locator('text=Dashboard')).toBeVisible();
  // Navigate to assignments page via sidebar
  await page.click('a:has-text("Assignments")');
  await expect(page.locator('text=Assignments')).toBeVisible();
  // Navigate to analytics
  await page.click('a:has-text("Analytics")');
  await expect(page.locator('text=Student 360')).toBeVisible();
});