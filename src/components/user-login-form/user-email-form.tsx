import { Button, Icons, Input } from '@/components'
import { cn } from '@/lib/utils'
import { validateEmail } from '@/utils'
import { ChangeEvent, useState } from 'react'

interface UserEmailFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserEmailForm({ className, ...props }: UserEmailFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isValid, setIsValid] = useState<boolean>(false)

	const [email, setEmail] = useState<string>('')

	function emailChangeHandler(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value)

		const isValid = validateEmail(e.target.value)

		setIsValid(isValid)
	}

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<>
			<div className={cn('grid gap-6', className)} {...props}>
				<form onSubmit={onSubmit}>
					<div className="grid gap-2">
						<div className="grid gap-2">
							<Input
								id="email"
								placeholder="name@example.com"
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isLoading}
								value={email}
								onChange={emailChangeHandler}
							/>
						</div>
						<Button disabled={isLoading || !isValid}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Войти с помощью электронной почты
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}
