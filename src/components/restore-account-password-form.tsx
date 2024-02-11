import { Button, Input, TypographyH3, toast } from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useRef, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'

import { i18next } from '@/locales'
import { useTranslation } from 'react-i18next'

const FormSchema = z.object({
	password: z.string().min(8, {
		message: i18next.t(
			'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
		),
	}),
})

export const RestoreAccountPasswordForm: FC = () => {
	const { t } = useTranslation()

	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const changePassword = useRestoreAccount(store => store.changePassword)
	const loader = useLoader()

	const navigation = useNavigate()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
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
			console.log(e)
		}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	useEffect(() => {
		if (!passwordInputRef.current) return

		passwordInputRef.current.focus()
	}, [passwordInputRef.current])
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
									<Input
										placeholder="MyPassword1!?"
										{...field}
										ref={e => {
											field.ref(e)
											passwordInputRef.current = e
										}}
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
						disabled={!form.formState.isDirty || !form.formState.isValid}
						className="w-full"
					>
						{t('modify')}
					</Button>
				</form>
			</Form>
		</div>
	)
}
