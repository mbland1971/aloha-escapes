import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility — WCAG 2.1 AA", () => {
  test("homepage passes axe audit", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("all images have descriptive alt text", async ({ page }) => {
    await page.goto("/");
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt, `img src="${await img.getAttribute("src")}" is missing alt`).toBeTruthy();
      expect(
        alt.length,
        `alt text "${alt}" is too short to be descriptive`
      ).toBeGreaterThan(10);
    }
  });

  test("email input has accessible label", async ({ page }) => {
    await page.goto("/");
    const input = page.locator('input[type="email"]');
    await expect(input).toHaveAttribute("aria-label");
  });

  test("nav landmark has aria-label", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav").first()).toHaveAttribute("aria-label");
  });

  test("main landmark is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeAttached();
  });

  test("reduced-motion CSS is present", async ({ page }) => {
    await page.goto("/");
    // Verify the page source references prefers-reduced-motion
    const content = await page.content();
    expect(content).toContain("prefers-reduced-motion");
  });
});
