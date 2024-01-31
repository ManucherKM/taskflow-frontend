import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(30, {
			message: 'Username must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please select an email to display.',
		})
		.email(),
	bio: z.string().max(160).min(4),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: 'Please enter a valid URL.' }),
			}),
		)
		.optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	bio: 'I own a computer.',
	urls: [
		{ value: 'https://shadcn.com' },
		{ value: 'http://twitter.com/shadcn' },
	],
}

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange',
	})

	const { fields, append } = useFieldArray({
		name: 'urls',
		control: form.control,
	})

	function onSubmit(data: ProfileFormValues) {
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
					name="username"
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
									<SelectItem value="asdasd">m@google.com</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Биография</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Расскажи нам немного о себе"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Вы можете <span>@упоминать</span> других пользователей и
								организации.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					{fields.map((field, index) => (
						<FormField
							control={form.control}
							key={field.id}
							name={`urls.${index}.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && 'sr-only')}>
										Ссылки
									</FormLabel>
									<FormDescription className={cn(index !== 0 && 'sr-only')}>
										Добавляйте полезные ссылки. Это может быть ссылка на
										веб-сайт, резюме, социальные сети и так далее.
									</FormDescription>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() => append({ value: '' })}
					>
						Добавить
					</Button>
				</div>
				<Button type="submit">Обновить профиль</Button>
			</form>
		</Form>
	)
}
