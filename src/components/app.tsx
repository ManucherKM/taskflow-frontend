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
import '@/assets/styles/global.scss'
import {
	CreateStageProvider,
	CreateTaskProvider,
	InitProvider,
	LogoutProvider,
	MultipleBoardActionsProvider,
	UpdateBoardProvider,
} from '.'
import { FontProvider } from './font-provider'
import { InviteUserToBoardProvider } from './invite-user-to-board-provider'
import { OpenTaskProvider } from './task-open-provider'
import { ThemeColorProvider } from './theme-color-provider'
import { UpdateStageProvider } from './update-stage-provider'
import { UpdateTaskProvider } from './update-task-provider'

/**
 * The main component of the application.
 *
 * @example
 * 	;<App />
 */
export const App: FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<ThemeColorProvider>
				<AnimatePresence mode="wait">
					<FontProvider>
						<LoaderProvider>
							<ToasterProvider>
								<MultipleBoardActionsProvider>
									<InviteUserToBoardProvider>
										<UpdateStageProvider>
											<UpdateBoardProvider>
												<CreateStageProvider>
													<CreateTaskProvider>
														<OpenTaskProvider>
															<UpdateTaskProvider>
																<LogoutProvider>
																	<InitProvider>
																		<AppRouter />
																	</InitProvider>
																</LogoutProvider>
															</UpdateTaskProvider>
														</OpenTaskProvider>
													</CreateTaskProvider>
												</CreateStageProvider>
											</UpdateBoardProvider>
										</UpdateStageProvider>
									</InviteUserToBoardProvider>
								</MultipleBoardActionsProvider>
							</ToasterProvider>
						</LoaderProvider>
					</FontProvider>
				</AnimatePresence>
			</ThemeColorProvider>
		</ThemeProvider>
	)
}
