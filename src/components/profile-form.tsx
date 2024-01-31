import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { MouseEvent, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Calendar } from '.'
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
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'

const profileFormSchema = z.object({
	firstName: z
		.string()
		.min(2, {
			message: 'Имя должно содержать хотя бы 2 символа',
		})
		.max(30, {
			message: 'Имя должно быть не более 30 символов',
		})
		.optional(),
	lastName: z
		.string()
		.min(2, {
			message: 'Фамилия должна содержать хотя бы 2 символа',
		})
		.max(30, {
			message: 'Фамилия должна содержать не более 30 символов',
		})
		.optional(),
	bio: z
		.string()
		.min(4, {
			message: 'Биография должна содержать не менее 4 символов',
		})
		.max(160, {
			message: 'Биография должна содержать не более 160 символов',
		})
		.optional(),

	birthday: z.date().optional(),

	urls: z
		.array(
			z.object({
				value: z.string().url({ message: 'Пожалуйста введите валидный URL' }),
			}),
		)
		.optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
	const user = useUserStore(store => store.user)

	const update = useUserStore(store => store.update)

	const [defaultValues, setDefaultValues] = useState<
		Partial<ProfileFormValues>
	>({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		birthday: user?.birthday ? new Date(user.birthday) : undefined,
		bio: user?.bio || '',
		urls: user?.urls,
	})

	const loader = useLoader()

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange',
	})

	const { fields, append, remove } = useFieldArray({
		name: 'urls',
		control: form.control,
	})

	async function onSubmit(data: ProfileFormValues) {
		try {
			const isSuccess = await loader(update, data)

			if (!isSuccess) {
				toast({
					title: 'Не удалось обновить профиль',
				})
				return
			}
		} catch (e) {
			console.log(e)
		}
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	useEffect(() => {
		setDefaultValues({
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			birthday: user?.birthday ? new Date(user.birthday) : undefined,
			bio: user?.bio || '',
			urls: user?.urls,
		})
	}, [user])

	useEffect(() => {
		form.reset(defaultValues)
	}, [defaultValues])

	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имя</FormLabel>
							<FormControl>
								<Input placeholder="taskflowteam" {...field} />
							</FormControl>
							<FormDescription>
								Это ваше общедоступное отображаемое имя.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Фамилия</FormLabel>
							<FormControl>
								<Input placeholder="taskflowteam" {...field} />
							</FormControl>
							<FormDescription>
								Это ваша общедоступная отображаемая фамилия.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="birthday"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>День рождения</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Выбрать дату</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={date =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Дата рождения используется для расчета вашего возраста.
							</FormDescription>
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
								Вы можете <span>@упоминать</span> других пользователей.
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

					{fields.length === 0 && (
						<>
							<FormLabel>Ссылки</FormLabel>
							<FormDescription className="mt-2">
								Добавляйте полезные ссылки. Это может быть ссылка на веб-сайт,
								резюме, социальные сети и так далее.
							</FormDescription>
						</>
					)}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() => append({ value: '' })}
					>
						Добавить
					</Button>

					{fields.length !== 0 && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2 ml-2 border-red-400 text-red-400 hover:text-red-400"
							onClick={() => remove(-1)}
						>
							Удалить
						</Button>
					)}
				</div>
				<Button
					type="submit"
					disabled={!form.formState.isDirty || !form.formState.isValid}
					onClick={submitHandler}
				>
					Обновить профиль
				</Button>
			</form>
		</Form>
	)
}
