import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CustomRouter } from './components'
import { history } from './config/history'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CustomRouter history={history}>
			<App />
		</CustomRouter>
	</React.StrictMode>,
)
