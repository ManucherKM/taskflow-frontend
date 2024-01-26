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
import { useAuthStore } from '@/storage'
import clsx from 'clsx'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Icons } from '..'

const FormSchema = z.object({
	userName: z.string().min(2, {
		message: 'Имя пользователя должно состоять минимум из 2 символов.',
	}),
})

export interface IUserNameForm {
	onNext: () => void
	onPrev: () => void
}

export const UserNameForm: FC<IUserNameForm> = ({ onNext, onPrev }) => {
	const userNameInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const setRegInfo = useAuthStore(store => store.setRegInfo)
	const checkUserName = useAuthStore(store => store.checkUserName)

	const [isValid, setIsValid] = useState<boolean>(false)
	const [isExist, setIsExist] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	const timer = useRef<NodeJS.Timeout | null>(null)

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			userName: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setRegInfo({ userName: data.userName })
	}

	const checkUserNameHandler = async (userName: string) => {
		try {
			setIsLoading(true)
			const isValid = await checkUserName(userName)
			setIsExist(isValid)
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		if (timer.current === null) {
			timer.current = setTimeout(
				() => checkUserNameHandler(e.target.value),
				300,
			)
			return
		}

		clearTimeout(timer.current)

		timer.current = setTimeout(() => checkUserNameHandler(e.target.value), 300)
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

	useEffect(() => {
		setIsValid(form.formState.isDirty && form.formState.isValid && !isExist)
	}, [form.formState.isDirty, form.formState.isValid, isExist])

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
								Имя пользователя
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
								Это ваше уникальное имя пользователя
							</FormDescription>
							{isExist && (
								<FormDescription className="text-[#7f1d1d] font-medium">
									Данное имя пользователя занято
								</FormDescription>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-between">
					<Button type="button" onClick={onPrev} variant={'outline'}>
						Назад
					</Button>
					<Button
						onClick={nextHandler}
						disabled={!isValid || isLoading}
						type="button"
						ref={nextButtonRef}
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Далее
					</Button>
				</div>
			</form>
		</Form>
	)
}
