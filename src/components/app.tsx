// Types
import type { FC } from 'react'

// Components
import { AppRouter, ThemeProvider } from '@/components'

// Utils
import { useStore } from '@/storage'

// Styles
// import '@/assets/styles/index.scss'

/**
 * The main component of the application.
 *
 * @example
 * 	;<App />
 */
export const App: FC = () => {
	// Loading state.
	const isLoading = useStore(store => store.isLoading)

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<AppRouter />
			</ThemeProvider>
		</>
	)
}
