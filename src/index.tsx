import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import { env } from './config/env'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const IS_DEVELOPMENT = env.get('IS_DEVELOPMENT').required().asBool()

root.render(
	<>
		{IS_DEVELOPMENT ? (
			<React.StrictMode>
				<App />
			</React.StrictMode>
		) : (
			<App />
		)}
	</>,
)
