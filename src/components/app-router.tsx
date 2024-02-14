// Types
import type { FC } from 'react'

// Components
import { Navigate, Route, Routes } from 'react-router'

// Utils
import { history } from '@/config/history'
import { ERoutes, privateRoutes, publicRoutes } from '@/config/routes'
import { useAuthStore } from '@/storage'
import { CreateBoardProvider, InitProvider } from '.'
import { CustomRouter } from './custom-router'

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
		<CustomRouter history={history}>
			<InitProvider>
				<CreateBoardProvider>
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

						<Route path="/*" element={<Navigate to={ERoutes.login} />} />
					</Routes>
				</CreateBoardProvider>
			</InitProvider>
		</CustomRouter>
	)
}
