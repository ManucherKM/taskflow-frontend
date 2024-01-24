// Types
import type { FC } from 'react'

// Components
import {
	AccountConfirm,
	Dashboard,
	Home,
	Login,
	Registration,
	RestoreAccountEmail,
	RestoreAccountOTP,
	RestoreAccountPassword,
	Setting,
} from '@/pages'

/** Application Routing Interface. */
export interface IRoute {
	/** The path along which the component will be rendered. */
	path: string

	/** The component that will be rendered. */
	component: FC
}

/** Enumeration of possible application routes. */
export enum ERoutes {
	/** Initial page route. */
	home = '/',

	/** `Login` page route. */
	login = '/auth/login',

	/** `Registration` page route. */
	registration = '/auth/registration',

	/** `RestoreAccountEmail` page route. */
	restoreAccountEmail = '/auth/restore/email',

	/** `RestoreAccountOTP` page route. */
	restoreAccountOTP = '/auth/restore/otp',

	/** `RestoreAccountPassword` page route. */
	restoreAccountPassword = '/auth/restore/password',

	/** `Setting` page route. */
	setting = '/setting',

	/** `AccountConfirm` page route. */
	accountConfirm = '/accountConfirm',

	dashboard = '/dashboard',
}

/** Public Routes */
export const publicRoutes: IRoute[] = [
	{
		path: ERoutes.login,
		component: Login,
	},
	{
		path: ERoutes.registration,
		component: Registration,
	},
	{
		path: ERoutes.restoreAccountEmail,
		component: RestoreAccountEmail,
	},

	{
		path: ERoutes.restoreAccountOTP,
		component: RestoreAccountOTP,
	},

	{
		path: ERoutes.accountConfirm,
		component: AccountConfirm,
	},
]

/** Private Routes */
export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.setting,
		component: Setting,
	},
	{
		path: ERoutes.restoreAccountPassword,
		component: RestoreAccountPassword,
	},
	{
		path: ERoutes.home,
		component: Home,
	},
	{
		path: ERoutes.dashboard,
		component: Dashboard,
	},
]
