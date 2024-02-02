// Types
import type { FC } from 'react'

// Components
import { AppRouter } from './app-router'
import { LoaderProvider } from './loader-provider'
import { ThemeProvider } from './theme-provider'
import { ToasterProvider } from './toaster-provider'

// Utils
import { AnimatePresence } from 'framer-motion'

// Styles
import '@/assets/styles/global.css'
import {
	CreateStageProvider,
	CreateTaskProvider,
	InitProvider,
	LogoutProvider,
	MultipleBoardActionsProvider,
	UpdateBoardProvider,
} from '.'
import { FontProvider } from './font-provider'
import { UpdateStageProvider } from './update-stage-provider'

/**
 * The main component of the application.
 *
 * @example
 * 	;<App />
 */
export const App: FC = () => {
	return (
		<div>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<AnimatePresence mode="wait">
					<FontProvider>
						<LoaderProvider>
							<ToasterProvider>
								<MultipleBoardActionsProvider>
									<UpdateStageProvider>
										<UpdateBoardProvider>
											<CreateStageProvider>
												<CreateTaskProvider>
													<LogoutProvider>
														<InitProvider>
															<AppRouter />
														</InitProvider>
													</LogoutProvider>
												</CreateTaskProvider>
											</CreateStageProvider>
										</UpdateBoardProvider>
									</UpdateStageProvider>
								</MultipleBoardActionsProvider>
							</ToasterProvider>
						</LoaderProvider>
					</FontProvider>
				</AnimatePresence>
			</ThemeProvider>
		</div>
	)
}
