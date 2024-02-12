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

import { Button, Icons, Input, toast } from '@/components'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useAccountFormSchema, useDelayForType, useLoader } from '@/hooks'
import { useAuthStore, useUserStore } from '@/storage'
import clsx from 'clsx'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// This can come from your database or API.

export function AccountForm() {
	const { t } = useTranslation()

	const accountFormSchema = useAccountFormSchema()

	type AccountFormValues = z.infer<typeof accountFormSchema>

	const user = useUserStore(store => store.user)

	const checkUserName = useAuthStore(store => store.checkUserName)

	const update = useUserStore(store => store.update)

	const [isValidUserName, setIsValidUserName] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [defaultValues, setDefaultValues] = useState<
		Partial<AccountFormValues>
	>({
		email: user?.email || '',
		userName: user?.userName || '',
	})

	const loader = useLoader()

	const delayForType = useDelayForType()

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	})

	async function onSubmit(data: AccountFormValues) {
		try {
			const isSuccess = await loader(update, data)

			if (!isSuccess) {
				toast({
					title: t('failed_to_update_account'),
				})
				return
			}

			toast({
				title: t('account_successfully_changed'),
			})
		} catch (e) {
			console.log(e)
		}
	}

	const fetchUserName = async (query: string) => {
		try {
			const isSuccess = await checkUserName(query)

			setIsValidUserName(!isSuccess)
		} catch (e) {
			console.error(e)
		}
	}

	async function userNameHandler(e: ChangeEvent<HTMLInputElement>) {
		setIsLoading(true)

		delayForType(() =>
			fetchUserName(e.target.value).finally(() => setIsLoading(false)),
		)
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	useEffect(() => {
		setDefaultValues({
			email: user?.email || '',
			userName: user?.userName || '',
		})
	}, [user])

	useEffect(() => {
		form.reset(defaultValues)
	}, [defaultValues])
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel
								className={clsx([
									!isValidUserName &&
										field.value !== defaultValues.userName &&
										!isLoading &&
										'text-[#7f1d1d]',
								])}
							>
								{t('username')}
							</FormLabel>
							<FormControl>
								<Input
									className={clsx([
										!isValidUserName &&
											field.value !== defaultValues.userName &&
											!isLoading &&
											'border-[#7f1d1d]',
									])}
									placeholder="taskflowteam"
									{...field}
									onChange={e => {
										field.onChange(e)
										userNameHandler(e)
									}}
								/>
							</FormControl>
							{!isValidUserName &&
								field.value !== defaultValues.userName &&
								!isLoading && (
									<FormDescription className="text-[#7f1d1d]">
										{t('this_username_is_already_taken')}
									</FormDescription>
								)}

							<FormDescription>
								{t(
									'this_is_your_publicly_available_display_username_its_how_it_allows_other_users_to_find_you',
								)}
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
							<FormLabel>{t('mail')}</FormLabel>
							{!!field.value && (
								<Select defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder={t('loading')} />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={field.value}>{field.value}</SelectItem>
									</SelectContent>
								</Select>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					onClick={submitHandler}
					disabled={!isValidUserName || isLoading}
				>
					{isLoading && (
						<Icons.spinner className="animate-spin dark:text-black w-4 h-4 mr-1" />
					)}
					{t('save_changes')}
				</Button>
			</form>
		</Form>
	)
}
