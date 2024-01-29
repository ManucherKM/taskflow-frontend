// Types
import type { FC } from 'react'

// Components
import {
	Account,
	AccountConfirm,
	Board,
	CheckYourEmail,
	Display,
	Home,
	Login,
	PrivacyPolicy,
	Profile,
	Registration,
	RestoreAccountEmail,
	RestoreAccountOTP,
	RestoreAccountPassword,
	TermsOfUse,
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

	privacyPolicy = '/privacy-policy',

	termsOfUse = '/terms-of-use',

	profile = '/setting/profile',

	account = '/setting/account',

	display = '/setting/display',

	/** `AccountConfirm` page route. */
	accountConfirm = '/account-confirm',

	/** `CheckYourEmail` page route. */
	checkYourEmail = '/check-your-email',

	board = '/dashboard',
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

	{
		path: ERoutes.checkYourEmail,
		component: CheckYourEmail,
	},
	{
		path: ERoutes.privacyPolicy,
		component: PrivacyPolicy,
	},
	{
		path: ERoutes.termsOfUse,
		component: TermsOfUse,
	},
]

/** Private Routes */
export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.display,
		component: Display,
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
		path: ERoutes.board + '/:id',
		component: Board,
	},
	{
		path: ERoutes.profile,
		component: Profile,
	},
	{
		path: ERoutes.account,
		component: Account,
	},
]
