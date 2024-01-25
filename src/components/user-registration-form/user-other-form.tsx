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
import { FC } from 'react'

const FormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	avatar: z.string(),
})

export interface UserOtherForm {
	onNext: () => void
	onPrev: () => void
}

export const UserOtherForm: FC<UserOtherForm> = ({ onPrev, onNext }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			avatar: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data)
	}

	function nextHandler() {
		form.handleSubmit(onSubmit)
		onNext()
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
								Имя <span className="text-red">*</span>
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
								Фамилия <span className="text-red">*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="Иванов" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="avatar"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Аватар <span className="text-red">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="text-sm file:text-white file:cursor-pointer cursor-pointer"
									type="file"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-between">
					<Button onClick={onPrev} variant={'outline'}>
						Назад
					</Button>
					<Button
						onClick={nextHandler}
						disabled={!form.formState.isDirty || !form.formState.isValid}
					>
						Создать
					</Button>
				</div>
			</form>
		</Form>
	)
}
