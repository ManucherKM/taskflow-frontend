import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FC, FormEvent } from 'react'

const FormSchema = z.object({
	username: z.string().min(2, {
		message: 'Имя пользователя должно состоять минимум из 2 символов.',
	}),
})

export interface IUserNameForm {
	onNext: () => void
	onPrev: () => void
}

export const UserNameForm: FC<IUserNameForm> = ({ onNext, onPrev }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имя пользователя</FormLabel>
							<FormControl>
								<Input placeholder="mypersonalname" {...field} />
							</FormControl>
							<FormDescription>
								Это ваше уникальное имя пользователя
							</FormDescription>
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
						Далее
					</Button>
				</div>
			</form>
		</Form>
	)
}
