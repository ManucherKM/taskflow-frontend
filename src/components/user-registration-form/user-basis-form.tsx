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
import { FC, FormEvent } from 'react'

const FormSchema = z.object({
	email: z
		.string()
		.regex(
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
			{
				message: 'Введите корректную почту',
			},
		),
	password: z.string().min(8, {
		message: 'Пароль должен состоять минимум из 8 символов.',
	}),
})

export interface IUserBasisForm {
	onNext: () => void
}

export const UserBasisForm: FC<IUserBasisForm> = ({ onNext }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data)
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
							<FormLabel>Почта</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
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
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input placeholder="MyPassword123?" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-end">
					<Button
						onClick={nextHandler}
						disabled={!form.formState.isDirty || !form.formState.isValid}
					>
						Далее
					</Button>
				</div>
			</form>
		</Form>
	)
}
