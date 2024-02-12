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
import { ERoutes } from '@/config/routes'
import { useLoader, useRegOtherFormSchema } from '@/hooks'
import { useAuthStore } from '@/storage'
import { IRegistrationTarget } from '@/storage/useAuthStore/types'
import { FC, FormEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useToast } from '../ui/use-toast'

export interface UserOtherForm {
	onPrev: () => void
}

export const UserOtherForm: FC<UserOtherForm> = ({ onPrev }) => {
	const { t } = useTranslation()

	const formSchema = useRegOtherFormSchema()

	const firstNameInputRef = useRef<HTMLInputElement | null>(null)
	const lastNameInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)
	const navigate = useNavigate()
	const registration = useAuthStore(store => store.registration)
	const regInfo = useAuthStore(store => store.regInfo)
	const loader = useLoader()

	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const totalInfo = { ...regInfo, ...data } as IRegistrationTarget

		try {
			const isSuccess = await loader(registration, totalInfo)

			if (!isSuccess) {
				toast({
					title: t('failed_to_create_an_account'),
					description: t('it_looks_like_you_entered_incorrect_data'),
				})
				return
			}

			navigate(ERoutes.checkYourEmail)
		} catch (e) {
			console.error(e)
		}
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	useEffect(() => {
		if (!firstNameInputRef.current) return

		firstNameInputRef.current.focus()
	}, [firstNameInputRef.current])
	return (
		<Form {...form}>
			<form className="w-full space-y-6">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('firstname')} <span className="text-red-400">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder={t('ivan')}
									{...field}
									ref={e => {
										field.ref(e)
										firstNameInputRef.current = e
									}}
									onKeyDown={e => {
										if (e.key === 'Enter') {
											lastNameInputRef.current?.focus()
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
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('surname')} <span className="text-red-400">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder={t('ivanov')}
									{...field}
									ref={e => {
										field.ref(e)
										lastNameInputRef.current = e
									}}
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

				<div className="w-full flex justify-between">
					<Button onClick={onPrev} variant={'outline'} type="button">
						{t('back')}
					</Button>
					<Button ref={nextButtonRef} onClick={nextHandler} type="button">
						{t('create')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
