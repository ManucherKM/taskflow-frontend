import { UserRegistrationForm, buttonVariants } from '@/components'
import { ERoutes } from '@/config/routes'
import { useRandomMotivationalPhrase } from '@/hooks'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export const Registration = () => {
	const { author, phrase } = useRandomMotivationalPhrase()

	return (
		<div className="container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Link
				to={ERoutes.login}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'absolute right-4 top-4 md:right-8 md:top-8',
				)}
			>
				Войти
			</Link>
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-2 h-6 w-6"
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					Acme Inc
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">&ldquo;{phrase}&rdquo;</p>
						<footer className="text-sm">{author}</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Создать аккаунт
						</h1>
						<p className="text-sm text-muted-foreground">
							Введи данные учетной записи ниже
						</p>
					</div>
					<UserRegistrationForm />
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
