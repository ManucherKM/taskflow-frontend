import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	TypographyH3,
	toast,
} from '@/components'
import { ERoutes } from '@/config/routes'
import {
	TRestoreAccountEmailFormSchema,
	useLoader,
	useRestoreAccountEmailFormSchema,
} from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { MouseEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export const RestoreAccountEmailForm: FC = () => {
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const createOtp = useRestoreAccount(store => store.createOtp)

	const formSchema = useRestoreAccountEmailFormSchema()
	const loader = useLoader()
	const navigation = useNavigate()
	const { t } = useTranslation()

	const form = useForm<TRestoreAccountEmailFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit(data: TRestoreAccountEmailFormSchema) {
		try {
			const isSuccess = await loader(createOtp, data.email)

			if (!isSuccess) {
				toast({
					title: t('unable_to_find_the_user'),
				})
				return
			}

			navigation(ERoutes.restoreAccountOTP)
		} catch (e) {
			console.error(e)
		}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()
	}

	return (
		<div className={'grid gap-6 w-full max-w-96'}>
			<TypographyH3 className="text-center">
				{t('account_restore')}
			</TypographyH3>
			<Form {...form}>
				<form onSubmit={e => e.preventDefault()} className="w-full space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>{t('mail')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										autoFocus
										placeholder="name@example.com"
										onKeyDown={e => {
											if (e.key === 'Enter') {
												nextButtonRef.current?.click()
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						ref={nextButtonRef}
						onClick={sendHandler}
						type="button"
						disabled={!form.formState.isValid}
						className="w-full"
					>
						{t('sign_in')}
					</Button>
				</form>
			</Form>
		</div>
	)
}
