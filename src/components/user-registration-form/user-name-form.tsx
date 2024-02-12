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
import { useDelayForType, useLoader, useRegNameFormSchema } from '@/hooks'
import { useAuthStore, useStore } from '@/storage'
import clsx from 'clsx'
import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Icons } from '..'

export interface IUserNameForm {
	onNext: () => void
	onPrev: () => void
}

export const UserNameForm: FC<IUserNameForm> = ({ onNext, onPrev }) => {
	const { t } = useTranslation()

	const formSchema = useRegNameFormSchema()

	const userNameInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const setRegInfo = useAuthStore(store => store.setRegInfo)
	const checkUserName = useAuthStore(store => store.checkUserName)

	const isLoading = useStore(store => store.isLoading)

	const loader = useLoader()

	const [isValid, setIsValid] = useState<boolean>(false)
	const [isExist, setIsExist] = useState<boolean>(false)

	const delayForType = useDelayForType()

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
		},
	})

	const changeIsValid = useCallback(() => {
		setIsValid(form.formState.isDirty && form.formState.isValid && !isExist)
	}, [form.formState.isDirty, form.formState.isValid, isExist])

	function onSubmit(data: z.infer<typeof formSchema>) {
		setRegInfo({ userName: data.userName })
	}

	const checkUserNameHandler = async (userName: string) => {
		try {
			const isValid = await loader(checkUserName, userName)

			setIsExist(!!isValid)
		} catch (e) {
			console.error(e)
		}
	}

	async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		setIsValid(false)

		delayForType(() =>
			checkUserNameHandler(e.target.value).finally(changeIsValid),
		)
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

	useEffect(() => {
		if (!userNameInputRef.current) return

		userNameInputRef.current.focus()
	}, [userNameInputRef.current])

	return (
		<Form {...form}>
			<form onSubmit={e => e.preventDefault()} className="w-full space-y-6">
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className={clsx([isExist && 'text-[#7f1d1d]'])}>
								{t('username')}
							</FormLabel>
							<FormControl>
								<Input
									placeholder="mypersonalname"
									{...field}
									onChange={e => {
										field.onChange(e)
										changeHandler(e)
									}}
									ref={e => {
										field.ref(e)
										userNameInputRef.current = e
									}}
									onKeyDown={e => {
										if (e.key === 'Enter' && isValid && !isLoading) {
											nextButtonRef.current?.click()
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								{t('this_is_your_unique_username')}
							</FormDescription>
							{isExist && (
								<FormDescription className="text-[#7f1d1d] font-medium">
									{t('this_user_name_is_busy')}
								</FormDescription>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-between">
					<Button type="button" onClick={onPrev} variant={'outline'}>
						{t('back')}
					</Button>
					<Button
						onClick={nextHandler}
						disabled={!isValid}
						type="button"
						ref={nextButtonRef}
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						{t('next')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
