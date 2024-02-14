import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { useRegBasisFormSchema } from '@/hooks'
import { useAuthStore } from '@/storage'
import { t } from 'i18next'
import { FC, FormEvent, useEffect, useRef } from 'react'
import { PasswordInput } from '../password-input'

export interface IUserBasisForm {
	onNext: () => void
}

export const UserBasisForm: FC<IUserBasisForm> = ({ onNext }) => {
	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const formSchema = useRegBasisFormSchema()

	const setRegInfo = useAuthStore(store => store.setRegInfo)

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(data: z.infer<typeof formSchema>) {
		setRegInfo(data)
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

	useEffect(() => {
		if (!emailInputRef.current) return

		emailInputRef.current.focus()
	}, [emailInputRef.current])
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
									placeholder="name@example.com"
									{...field}
									ref={e => {
										field.ref(e)
										emailInputRef.current = e
									}}
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
									placeholder="MyPassword123?"
									{...field}
									ref={e => {
										field.ref(e)
										passwordInputRef.current = e
									}}
									onKeyDown={e => {
										if (
											e.key === 'Enter' &&
											form.formState.isDirty &&
											form.formState.isValid
										) {
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
						disabled={!form.formState.isDirty || !form.formState.isValid}
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
