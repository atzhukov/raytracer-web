import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {playwright} from '@vitest/browser-playwright'

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: 'jsdom',
		includeSource: ['src/**/*.{js,ts}'],
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [{browser: 'chromium'}],
			headless: true,
		},
	},
})
