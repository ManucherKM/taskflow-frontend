// Types
import type { FC } from 'react'

// Components
import { AppRouter } from './app-router'
import { LoaderProvider } from './loader-provider'
import { ThemeProvider } from './theme-provider'
import { ToasterProvider } from './toaster-provider'

// Utils
import { i18next } from '@/locales'
import { AnimatePresence } from 'framer-motion'

// Styles
import '@/assets/styles/global.scss'
import { I18nextProvider } from 'react-i18next'
import {
	CreateStageProvider,
	CreateTaskProvider,
	InitProvider,
	LogoutProvider,
	MultipleBoardActionsProvider,
	UpdateBoardProvider,
} from '.'
import { BoardMembersProvider } from './board-members-provider'
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
				<I18nextProvider i18n={i18next}>
					<AnimatePresence mode="wait">
						<FontProvider>
							<LoaderProvider>
								<ToasterProvider>
									<MultipleBoardActionsProvider>
										<InviteUserToBoardProvider>
											<UpdateStageProvider>
												<UpdateBoardProvider>
													<CreateStageProvider>
														<BoardMembersProvider>
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
														</BoardMembersProvider>
													</CreateStageProvider>
												</UpdateBoardProvider>
											</UpdateStageProvider>
										</InviteUserToBoardProvider>
									</MultipleBoardActionsProvider>
								</ToasterProvider>
							</LoaderProvider>
						</FontProvider>
					</AnimatePresence>
				</I18nextProvider>
			</ThemeColorProvider>
		</ThemeProvider>
	)
}
