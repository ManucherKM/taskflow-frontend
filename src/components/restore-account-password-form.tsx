import { Button, TypographyH3, toast } from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { ERoutes } from '@/config/routes'
import {
	TRestoreAccountPasswordFormSchema,
	useLoader,
	useRestoreAccountPasswordFormSchema,
} from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useRef, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useTranslation } from 'react-i18next'
import { PasswordInput } from './password-input'

export const RestoreAccountPasswordForm: FC = () => {
	const { t } = useTranslation()

	const formSchema = useRestoreAccountPasswordFormSchema()

	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const changePassword = useRestoreAccount(store => store.changePassword)
	const loader = useLoader()

	const navigation = useNavigate()

	const form = useForm<TRestoreAccountPasswordFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
		},
	})

	async function onSubmit(data: TRestoreAccountPasswordFormSchema) {
		try {
			const isSuccess = await loader(changePassword, data.password)

			if (!isSuccess) {
				toast({
					title: t('failed_to_change_the_password'),
					description: t(
						'try_restarting_the_application_and_repeating_again_if_the_problem_persists_please_write_to_us_at_taskflowteam_gmail_com',
					),
				})
				return
			}

			navigation(ERoutes.login)
		} catch (e) {
			console.error(e)
		}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	return (
		<div className="flex flex-col gap-6 justify-center items-center h-[calc(100vh-56px)]">
			<TypographyH3>{t('change_password')}</TypographyH3>
			<Form {...form}>
				<form
					onSubmit={e => e.preventDefault()}
					className="w-full space-y-6 max-w-96"
				>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('new_password')}</FormLabel>
								<FormControl>
									<PasswordInput
										{...field}
										placeholder="MyPassword1!?"
										autoFocus
										onKeyDown={e => {
											if (e.key === 'Enter') {
												loginButtonRef.current?.click()
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						ref={loginButtonRef}
						onClick={sendHandler}
						type="button"
						disabled={!form.formState.isValid}
						className="w-full"
					>
						{t('modify')}
					</Button>
				</form>
			</Form>
		</div>
	)
}
