// Types
import type { FC } from 'react'

// Components
import { Logo, UserLoginForm } from '@/components'
import { Link } from 'react-router-dom'

// Utils
import { ERoutes } from '@/config/routes'
import { useRandomMotivationalPhrase } from '@/hooks'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

/** Component for user authorization. */
export const Login: FC = () => {
	const { t } = useTranslation()

	// We get a motivational phrase and its author.
	const { author, phrase } = useRandomMotivationalPhrase()

	return (
		<div className="container relative h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-input dark:bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Logo />
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg text-foreground">&ldquo;{phrase}&rdquo;</p>
						<footer className="text-sm text-foreground">{author}</footer>
					</blockquote>
				</div>
			</div>
			<div className="h-full">
				<div className="flex justify-end pt-8 lg:p-8">
					<Link
						to={ERoutes.registration}
						className={cn('text-sm font-medium hover:underline')}
					>
						{t('create')}
					</Link>
				</div>
				<div className="lg:p-8 h-[calc(100%-52px)] flex justify-center">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								{t('log_in_to_taskflow')}
							</h1>
							<p className="text-sm text-muted-foreground">
								{t('enter_your_account_information_below')}
							</p>
						</div>
						<UserLoginForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							{t('by_continuing_you_agree_to_our')}{' '}
							<Link
								to={ERoutes.termsOfUse}
								className="underline underline-offset-4 hover:text-primary"
							>
								{t('terms_of_use')}
							</Link>{' '}
							{t('and')}{' '}
							<Link
								to={ERoutes.privacyPolicy}
								className="underline underline-offset-4 hover:text-primary"
							>
								{t('privacy_policy')}
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
