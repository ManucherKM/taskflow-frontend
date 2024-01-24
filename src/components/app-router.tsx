// Types
import type { FC } from 'react'

// Components
import { Route, Routes } from 'react-router'

// Utils
import { privateRoutes, publicRoutes } from '@/config/routes'
import { useAuthStore } from '@/storage'

/**
 * The component responsible for render routes.
 *
 * @example
 * 	;<AppRouter />
 */
export const AppRouter: FC = () => {
	// The state responsible for user authorization.
	const isAuth: boolean = !!useAuthStore(store => store.token)

	return (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}

			{isAuth &&
				privateRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}

			<Route path="/*" element={<h1>Not Found</h1>} />
		</Routes>
	)
}
