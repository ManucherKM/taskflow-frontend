// Types
import type { FC } from 'react'

// Components
import { AppRouter, LoaderProvider, ThemeProvider } from '@/components'

// Utils

// Styles
import '@/assets/styles/global.css'

/**
 * The main component of the application.
 *
 * @example
 * 	;<App />
 */
export const App: FC = () => {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<LoaderProvider>
					<AppRouter />
				</LoaderProvider>
			</ThemeProvider>
		</>
	)
}
