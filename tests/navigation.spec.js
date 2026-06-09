import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("page loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Aloha Escapes/);
  });

  test("nav links scroll to correct sections", async ({ page }) => {
    for (const [href, id] of [
      ["#islands", "islands"],
      ["#experiences", "experiences"],
      ["#how", "how"],
      ["#stories", "stories"],
    ]) {
      await page.goto("/");
      const link = page.locator(`.nav__links a[href="${href}"]`);
      // On mobile the nav is hidden behind a toggle
      if (!(await link.isVisible())) {
        await page.locator("#nav-toggle").click();
        await page.waitForTimeout(200);
      }
      await link.click();
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.05 });
    }
  });

  test("primary CTA scrolls to plan section", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="#plan"].btn-primary');
    await expect(page.locator("#plan")).toBeInViewport({ ratio: 0.1 });
  });

  test("email form accepts input", async ({ page }) => {
    await page.goto("/");
    await page.locator("#plan").scrollIntoViewIfNeeded();
    const input = page.locator('form input[type="email"]');
    await input.fill("test@example.com");
    await expect(input).toHaveValue("test@example.com");
  });

  test("mobile nav opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const toggle = page.locator("#nav-toggle");
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    // Close via a nav link
    await page.locator(".nav__links a").first().click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("nav CTA button is keyboard focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // Tab through until we reach the nav CTA
    let found = false;
    for (let i = 0; i < 10; i++) {
      const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (focused?.includes("Plan Your Trip")) {
        found = true;
        break;
      }
      await page.keyboard.press("Tab");
    }
    expect(found).toBe(true);
  });
});
