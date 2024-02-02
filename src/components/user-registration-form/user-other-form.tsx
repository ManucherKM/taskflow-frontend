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
import { useLoader } from '@/hooks'
import { useAuthStore } from '@/storage'
import { IRegistrationTarget } from '@/storage/useAuthStore/types'
import { FC, FormEvent, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useToast } from '../ui/use-toast'

const FormSchema = z.object({
	firstName: z
		.string()
		.min(2, {
			message: 'Имя должно содержать хотя бы 2 символа',
		})
		.max(30, {
			message: 'Имя должно быть не более 30 символов',
		})
		.optional()
		.or(z.literal('')),

	lastName: z
		.string()
		.min(2, {
			message: 'Фамилия должна содержать хотя бы 2 символа',
		})
		.max(30, {
			message: 'Фамилия должна содержать не более 30 символов',
		})
		.optional()
		.or(z.literal('')),
})

export interface UserOtherForm {
	onPrev: () => void
}

export const UserOtherForm: FC<UserOtherForm> = ({ onPrev }) => {
	const firstNameInputRef = useRef<HTMLInputElement | null>(null)
	const lastNameInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)
	const navigate = useNavigate()
	const registration = useAuthStore(store => store.registration)
	const regInfo = useAuthStore(store => store.regInfo)
	const loader = useLoader()

	const { toast } = useToast()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const totalInfo = { ...regInfo, ...data } as IRegistrationTarget

		try {
			const isSuccess = await loader(registration, totalInfo)

			if (!isSuccess) {
				toast({
					title: 'Не удалось создать аккаунт.',
					description: 'Похоже что вы указали некорректные данные.',
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
								Имя <span className="text-red-400">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Иван"
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
								Фамилия <span className="text-red-400">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Иванов"
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
						Назад
					</Button>
					<Button ref={nextButtonRef} onClick={nextHandler} type="button">
						Создать
					</Button>
				</div>
			</form>
		</Form>
	)
}
