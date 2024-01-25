// Types
import type { FC } from 'react'

// Components
import { AppRouter, LoaderProvider, ThemeProvider } from '@/components'

// Utils

// Styles
import '@/assets/styles/global.css'
import { ToasterProvider } from './toaster-provider'

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
					<ToasterProvider>
						<AppRouter />
					</ToasterProvider>
				</LoaderProvider>
			</ThemeProvider>
		</>
	)
}
