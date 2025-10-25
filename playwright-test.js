const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'http://localhost:8000';
const VIEWPORT = { width: 1920, height: 1080 };

test.describe('Cuddlefish Website Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await page.setViewportSize(VIEWPORT);
    });

    test('Hero section loads correctly', async ({ page }) => {
        // Check hero title
        const heroTitle = page.locator('.hero-title');
        await expect(heroTitle).toBeVisible();
        await expect(heroTitle).toHaveText('CUDDLEFISH');

        // Check hero subtitle
        const heroSubtitle = page.locator('.hero-subtitle');
        await expect(heroSubtitle).toBeVisible();

        // Check CTA button
        const ctaButton = page.locator('.cta-button');
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toHaveText('Explore');

        // Take screenshot
        await page.screenshot({ path: 'test-results/hero-section.png', fullPage: false });
        console.log('✓ Hero section screenshot saved');
    });

    test('Video background is present', async ({ page }) => {
        // Check if video element exists
        const video = page.locator('.hero-video');
        await expect(video).toBeVisible();

        // Check video source
        const videoSource = video.locator('source');
        await expect(videoSource).toHaveAttribute('src', 'videos/Horizontal Floating (Baseline).mp4');

        console.log('✓ Video background verified');
    });

    test('Navigation bar functionality', async ({ page }) => {
        // Check navbar exists
        const navbar = page.locator('#navbar');
        await expect(navbar).toBeVisible();

        // Check all navigation links
        const navLinks = ['About', 'Features', 'Interactions', 'Use Cases', 'Contact'];
        for (const linkText of navLinks) {
            const link = page.locator('.nav-menu a', { hasText: linkText });
            await expect(link).toBeVisible();
        }

        // Test navigation by clicking About link
        await page.click('a[href="#about"]');
        await page.waitForTimeout(1000); // Wait for smooth scroll

        console.log('✓ Navigation links verified');
    });

    test('About section content', async ({ page }) => {
        await page.click('a[href="#about"]');
        await page.waitForTimeout(500);

        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeVisible();

        // Check for key content
        await expect(aboutSection).toContainText('robotic avatar');
        await expect(aboutSection).toContainText('flapping-wing');

        // Take screenshot
        await page.screenshot({ path: 'test-results/about-section.png' });
        console.log('✓ About section screenshot saved');
    });

    test('Features section displays all 6 features', async ({ page }) => {
        await page.click('a[href="#features"]');
        await page.waitForTimeout(500);

        const featureCards = page.locator('.feature-card');
        const count = await featureCards.count();
        expect(count).toBe(6);

        // Check feature titles
        const expectedFeatures = [
            'Safe Design',
            'Physical Interaction',
            'Bioinspired Design',
            'Intuitive Control',
            'Indoor Optimized',
            'First-Person View'
        ];

        for (const feature of expectedFeatures) {
            const featureCard = page.locator('.feature-card', { hasText: feature });
            await expect(featureCard).toBeVisible();
        }

        // Take screenshot
        await page.screenshot({ path: 'test-results/features-section.png' });
        console.log('✓ Features section screenshot saved');
    });

    test('Interactions section visibility', async ({ page }) => {
        await page.click('a[href="#interactions"]');
        await page.waitForTimeout(500);

        const interactionsSection = page.locator('#interactions');
        await expect(interactionsSection).toBeVisible();

        // Check interaction items
        const interactionItems = page.locator('.interaction-item');
        const count = await interactionItems.count();
        expect(count).toBe(6);

        // Take screenshot
        await page.screenshot({ path: 'test-results/interactions-section.png' });
        console.log('✓ Interactions section screenshot saved');
    });

    test('Use Cases section content', async ({ page }) => {
        await page.click('a[href="#use-cases"]');
        await page.waitForTimeout(500);

        const useCasesSection = page.locator('#use-cases');
        await expect(useCasesSection).toBeVisible();

        // Check for key use cases
        await expect(useCasesSection).toContainText('Remote Family Connection');
        await expect(useCasesSection).toContainText('Telepresence');

        // Take screenshot
        await page.screenshot({ path: 'test-results/use-cases-section.png' });
        console.log('✓ Use cases section screenshot saved');
    });

    test('Contact section with email', async ({ page }) => {
        await page.click('a[href="#contact"]');
        await page.waitForTimeout(500);

        const contactSection = page.locator('#contact');
        await expect(contactSection).toBeVisible();

        // Check for Mingyang's name and email
        await expect(contactSection).toContainText('Mingyang Xu');
        const emailLink = page.locator('.contact-email');
        await expect(emailLink).toBeVisible();
        await expect(emailLink).toHaveAttribute('href', 'mailto:mingyang@kmd.keio.ac.jp');
        await expect(emailLink).toHaveText('mingyang@kmd.keio.ac.jp');

        // Take screenshot
        await page.screenshot({ path: 'test-results/contact-section.png' });
        console.log('✓ Contact section screenshot saved');
    });

    test('CTA button hover effect', async ({ page }) => {
        const ctaButton = page.locator('.cta-button');

        // Hover over button
        await ctaButton.hover();
        await page.waitForTimeout(500);

        // Take screenshot of hover state
        await page.screenshot({ path: 'test-results/cta-hover.png' });
        console.log('✓ CTA button hover screenshot saved');
    });

    test('Full page screenshot', async ({ page }) => {
        // Take full page screenshot
        await page.screenshot({ path: 'test-results/full-page.png', fullPage: true });
        console.log('✓ Full page screenshot saved');
    });

    test('Mobile responsive design', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Check if hero section adapts
        const heroTitle = page.locator('.hero-title');
        await expect(heroTitle).toBeVisible();

        // Take mobile screenshot
        await page.screenshot({ path: 'test-results/mobile-view.png', fullPage: true });
        console.log('✓ Mobile view screenshot saved');
    });

    test('Tablet responsive design', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });

        // Check layout
        const heroTitle = page.locator('.hero-title');
        await expect(heroTitle).toBeVisible();

        // Take tablet screenshot
        await page.screenshot({ path: 'test-results/tablet-view.png', fullPage: true });
        console.log('✓ Tablet view screenshot saved');
    });

    test('Scroll behavior', async ({ page }) => {
        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);

        // Check if navbar has scrolled class
        const navbar = page.locator('#navbar');
        await expect(navbar).toHaveClass(/scrolled/);

        console.log('✓ Scroll behavior verified');
    });

    test('All sections are accessible', async ({ page }) => {
        const sections = ['#hero', '#about', '#features', '#interactions', '#use-cases', '#contact'];

        for (const section of sections) {
            const element = page.locator(section);
            await expect(element).toBeVisible();
        }

        console.log('✓ All sections accessible');
    });

    test('Performance: Page load time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto(BASE_URL);
        const loadTime = Date.now() - startTime;

        console.log(`✓ Page loaded in ${loadTime}ms`);
        expect(loadTime).toBeLessThan(5000); // Should load in under 5 seconds
    });
});

test.describe('Visual Regression Tests', () => {
    test('Hero section visual test', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('networkidle');

        const hero = page.locator('#hero');
        await expect(hero).toHaveScreenshot('hero-visual.png', {
            maxDiffPixels: 100
        });
    });

    test('Features grid visual test', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.click('a[href="#features"]');
        await page.waitForTimeout(1000);

        const features = page.locator('.features-grid');
        await expect(features).toHaveScreenshot('features-visual.png', {
            maxDiffPixels: 100
        });
    });
});

console.log('\n🐠 Cuddlefish website test suite ready!\n');
