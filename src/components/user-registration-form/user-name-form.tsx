import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import {
	TRegNameFormSchema,
	useCheckUserName,
	useDelayForType,
	useRegNameFormSchema,
} from '@/hooks'
import { useAuthStore } from '@/storage'
import clsx from 'clsx'
import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useRef,
	useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Icons } from '../icons'

export interface IUserNameForm {
	onNext: () => void
	onPrev: () => void
}

export const UserNameForm: FC<IUserNameForm> = ({ onNext, onPrev }) => {
	const [isLoading, setLoading] = useState<boolean>(false)

	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const regInfo = useAuthStore(store => store.regInfo)
	const setRegInfo = useAuthStore(store => store.setRegInfo)

	const [isValid, setIsValid] = useState<boolean>(!!regInfo?.userName)

	const { isExist, checkUserNameHandler } = useCheckUserName()
	const formSchema = useRegNameFormSchema()
	const delayForType = useDelayForType()
	const { t } = useTranslation()

	const form = useForm<TRegNameFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: regInfo?.userName || '',
		},
	})

	const changeIsValid = useCallback(() => {
		setIsValid(form.formState.isValid && !isExist)
	}, [form.formState.isValid, isExist])

	async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		setIsValid(false)
		setLoading(true)

		delayForType(() =>
			checkUserNameHandler(e.target.value).finally(() => {
				setLoading(false)
				changeIsValid()
			}),
		)
	}

	function onSubmit(data: TRegNameFormSchema) {
		setRegInfo({ ...regInfo, ...data })
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

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
									{...field}
									placeholder="mypersonalname"
									onChange={e => {
										field.onChange(e)
										changeHandler(e)
									}}
									autoFocus
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
