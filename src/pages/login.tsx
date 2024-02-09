// Types
import type { FC } from 'react'

// Components
import { Logo, UserLoginForm, buttonVariants } from '@/components'
import { Link } from 'react-router-dom'

// Utils
import { ERoutes } from '@/config/routes'
import { useRandomMotivationalPhrase } from '@/hooks'
import { cn } from '@/lib/utils'

/** Component for user authorization. */
export const Login: FC = () => {
	// We get a motivational phrase and its author.
	const { author, phrase } = useRandomMotivationalPhrase()

	return (
		<div className="container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
			<Link
				to={ERoutes.registration}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'absolute right-4 top-4 md:right-8 md:top-8',
				)}
			>
				Создать
			</Link>
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
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Войти в TaskFlow
						</h1>
						<p className="text-sm text-muted-foreground">
							Введи данные учетной записи ниже
						</p>
					</div>
					<UserLoginForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						Продолжая вы соглашаетесь с нашими{' '}
						<Link
							to={ERoutes.termsOfUse}
							className="underline underline-offset-4 hover:text-primary"
						>
							Условиями использования
						</Link>{' '}
						и{' '}
						<Link
							to={ERoutes.privacyPolicy}
							className="underline underline-offset-4 hover:text-primary"
						>
							Политикой конфиденциальности
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	)
}
