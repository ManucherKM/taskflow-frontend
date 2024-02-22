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
import { ERoutes } from '@/config/routes'
import { TRegOtherFormSchema, useLoader, useRegOtherFormSchema } from '@/hooks'
import { useAuthStore } from '@/storage'
import { IRegistrationTarget } from '@/storage/useAuthStore/types'
import { FC, FormEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useToast } from '../ui/use-toast'

export interface UserOtherForm {
	onPrev: () => void
}

export const UserOtherForm: FC<UserOtherForm> = ({ onPrev }) => {
	const lastNameInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const registration = useAuthStore(store => store.registration)
	const regInfo = useAuthStore(store => store.regInfo)
	const setRegInfo = useAuthStore(store => store.setRegInfo)

	const formSchema = useRegOtherFormSchema()

	const navigate = useNavigate()
	const loader = useLoader()
	const { t } = useTranslation()

	const { toast } = useToast()

	const form = useForm<TRegOtherFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
		},
	})

	async function onSubmit(data: TRegOtherFormSchema) {
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

			setRegInfo(null)

			navigate(ERoutes.checkYourEmail)
		} catch (e) {
			console.error(e)
		}
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

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
									{...field}
									placeholder={t('ivan')}
									autoFocus
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
									{...field}
									placeholder={t('ivanov')}
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
