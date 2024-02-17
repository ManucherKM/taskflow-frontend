import { useLoader, useProfileFormSchema } from '@/hooks'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
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

export function ProfileForm() {
	const { t } = useTranslation()

	const profileFormSchema = useProfileFormSchema()

	type ProfileFormValues = z.infer<typeof profileFormSchema>

	const user = useUserStore(store => store.user)

	const setUser = useUserStore(store => store.setUser)

	const update = useUserStore(store => store.update)

	const [defaultValues, setDefaultValues] = useState<
		Partial<ProfileFormValues>
	>({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		birthday: user?.birthday || '',
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
			const payload: ProfileFormValues = {}

			let key: keyof typeof data

			for (key in data) {
				if (
					!!data[key] &&
					user &&
					data[key]?.toString() !== user[key]?.toString()
				) {
					payload[key] = data[key] as any
				}
			}

			const updatedUser = await loader(update, payload)

			if (!updatedUser) {
				toast({
					title: t('failed_to_update_profile'),
				})
				return
			}

			toast({
				title: t('profile_successfully_modified'),
			})

			setUser(updatedUser)
		} catch (e) {
			console.error(e)
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
			birthday: user?.birthday || '',
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
							<FormLabel>{t('firstname')}</FormLabel>
							<FormControl>
								<Input className="w-72" placeholder={t('ivan')} {...field} />
							</FormControl>
							<FormDescription>
								{t('this_is_your_public_display_name')}
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
							<FormLabel>{t('surname')}</FormLabel>
							<FormControl>
								<Input className="w-72" placeholder={t('ivanov')} {...field} />
							</FormControl>
							<FormDescription>
								{t('this_is_your_publicly_available_displayed_last_name')}
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
							<FormLabel>{t('birthday')}</FormLabel>
							<FormControl>
								<Input
									type="date"
									placeholder={t('select_a_date')}
									className="w-48"
									min={'1899-01-01'}
									max={new Date().toISOString().split('T')[0]}
									onKeyDown={e => e.preventDefault()}
									{...field}
								/>
							</FormControl>

							<FormDescription>
								{t('your_date_of_birth_is_usedto_calculate_your_age')}
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
							<FormLabel>{t('biography')}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t('tell_us_a_little_bit_about_yourself')}
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t('you_can')} <span>{t('mention')}</span> {t('of_other_users')}
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
										{t('references')}
									</FormLabel>
									<FormDescription className={cn(index !== 0 && 'sr-only')}>
										{t(
											'add_useful_links_this_can_be_a_link_to_a_website_resume_social_media_and_so_on',
										)}
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
							<FormLabel> {t('references')}</FormLabel>
							<FormDescription className="mt-2">
								{t(
									'add_useful_links_this_can_be_a_link_to_a_website_resume_social_media_and_so_on',
								)}
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
						{t('add')}
					</Button>

					{fields.length !== 0 && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2 ml-2 border-red-400 text-red-400 hover:text-red-400"
							onClick={() => remove(-1)}
						>
							{t('delete')}
						</Button>
					)}
				</div>
				<Button
					type="submit"
					disabled={!form.formState.isDirty || !form.formState.isValid}
					onClick={submitHandler}
				>
					{t('update_profile')}
				</Button>
			</form>
		</Form>
	)
}
