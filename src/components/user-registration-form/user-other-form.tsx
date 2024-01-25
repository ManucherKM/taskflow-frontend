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
import { history } from '@/config/history'
import { ERoutes } from '@/config/routes'
import { useAuthStore, useStore } from '@/storage'
import { IRegistrationTarget } from '@/storage/useAuthStore/types'
import { FC, FormEvent } from 'react'
import { useToast } from '../ui/use-toast'

const FormSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
})

export interface UserOtherForm {
	onPrev: () => void
}

export const UserOtherForm: FC<UserOtherForm> = ({ onPrev }) => {
	const registration = useAuthStore(store => store.registration)
	const regInfo = useAuthStore(store => store.regInfo)
	const setLoading = useStore(store => store.setLoading)

	const { toast } = useToast()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const totalInfo = { ...regInfo, ...data } as IRegistrationTarget

		try {
			setLoading(true)

			const isSuccess = await registration(totalInfo)

			setLoading(false)
			console.log(isSuccess)

			if (!isSuccess) {
				toast({
					title: 'Не удалось создать аккаунт.',
					description: 'Похоже что вы указали некорректные данные.',
				})
				return
			}

			history.push(ERoutes.checkYourEmail)
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
								Имя <span className="text-red-400">*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="Иван" {...field} />
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
								<Input placeholder="Иванов" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-between">
					<Button onClick={onPrev} variant={'outline'}>
						Назад
					</Button>
					<Button onClick={nextHandler}>Создать</Button>
				</div>
			</form>
		</Form>
	)
}
