const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './',
    testMatch: 'playwright-test.js',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: [
        ['html', { outputFolder: 'test-results/html-report' }],
        ['list']
    ],
    use: {
        baseURL: 'http://localhost:8000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'python3 -m http.server 8000',
        port: 8000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
});
