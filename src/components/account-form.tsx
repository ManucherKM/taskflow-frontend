import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

import { Button, Input, toast } from '@/components'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

const accountFormSchema = z.object({
	userName: z
		.string()
		.min(2, {
			message: 'Имя пользователя должно состоять минимум из 2 символов.',
		})
		.max(30, {
			message: 'Имя пользователя не должно превышать 30 символов.',
		}),
	email: z.string().email({
		message: 'Введите корректную почту',
	}),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
	email: 'test@gmail.com',
	userName: 'asdiuyqwe',
}

export function AccountForm() {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	})

	function onSubmit(data: AccountFormValues) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имя пользователя</FormLabel>
							<FormControl>
								<Input placeholder="taskflowteam" {...field} />
							</FormControl>
							<FormDescription>
								Это ваше общедоступное отображаемое имя пользователя. С помощью
								него вас могу находить другие пользователи.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Почта</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value || 'asdasd'}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a verified email to display" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="test@gmail.com">test@gmail.com</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Сохранить изменения</Button>
			</form>
		</Form>
	)
}
