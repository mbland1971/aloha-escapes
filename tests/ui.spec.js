import { test, expect } from "@playwright/test";

test.describe("UI Components", () => {
  test("hero section renders with headline", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator(".hero__h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("islands");
  });

  test("islands section has exactly 4 island cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".icard")).toHaveCount(4);
  });

  test("experiences section has exactly 6 experience cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".ecard")).toHaveCount(6);
  });

  test("how-we-work section has 3 steps", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".step")).toHaveCount(3);
  });

  test("testimonials section has 2 testimonial cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".tcard")).toHaveCount(2);
  });

  test("nav transitions to scrolled state after scroll", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("#nav");
    await expect(nav).not.toHaveClass(/scrolled/);
    await page.mouse.wheel(0, 200);
    await expect(nav).toHaveClass(/scrolled/, { timeout: 1000 });
  });

  test("island card hover reveals tag text", async ({ page }) => {
    await page.goto("/");
    const card = page.locator(".icard").first();
    const tag = card.locator(".icard__tag");

    // Initially hidden via opacity: 0
    await expect(tag).toHaveCSS("opacity", "0");
    await card.hover();
    await expect(tag).toHaveCSS("opacity", "1", { timeout: 1000 });
  });

  test("testimonial cards become visible on scroll", async ({ page }) => {
    await page.goto("/");
    await page.locator("#stories").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(page.locator(".tcard.visible")).toHaveCount(2);
  });

  test("audio player is present in DOM", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#aplayer")).toBeAttached();
    await expect(page.locator("#ambient-audio")).toBeAttached();
  });

  test("footer contains copyright notice", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".footer__copy")).toContainText("Aloha Escapes");
  });
});
