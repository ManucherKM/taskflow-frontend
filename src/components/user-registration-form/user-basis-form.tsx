import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TRegBasisFormSchema, useRegBasisFormSchema } from '@/hooks'
import { useAuthStore } from '@/storage'
import { t } from 'i18next'
import { FC, FormEvent, useRef } from 'react'
import { PasswordInput } from '../password-input'

export interface IUserBasisForm {
	onNext: () => void
}

export const UserBasisForm: FC<IUserBasisForm> = ({ onNext }) => {
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const formSchema = useRegBasisFormSchema()

	const regInfo = useAuthStore(store => store.regInfo)
	const setRegInfo = useAuthStore(store => store.setRegInfo)

	const form = useForm<TRegBasisFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: regInfo?.email || '',
			password: regInfo?.password || '',
		},
	})

	function onSubmit(data: TRegBasisFormSchema) {
		setRegInfo({ ...regInfo, ...data })
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

	return (
		<Form {...form}>
			<form className="w-full space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('mail')}</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="name@example.com"
									autoFocus
									onKeyDown={e => {
										if (e.key === 'Enter') {
											passwordInputRef.current?.focus()
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('password')}</FormLabel>
							<FormControl>
								<PasswordInput
									{...field}
									placeholder="MyPassword123?"
									ref={e => {
										field.ref(e)
										passwordInputRef.current = e
									}}
									onKeyDown={e => {
										if (e.key === 'Enter' && form.formState.isValid) {
											nextButtonRef.current?.click()
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-end">
					<Button
						onClick={nextHandler}
						disabled={!form.formState.isValid}
						type="button"
						ref={nextButtonRef}
					>
						{t('next')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
