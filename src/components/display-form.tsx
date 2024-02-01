import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Theme,
	useTheme,
} from '@/components'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { useDisplayStore } from '@/storage'
import { EFont } from '@/storage/useDisplayStore/types'
import { changeFirstLetterToUppercase } from '@/utils'
import { ChangeEvent } from 'react'
import { buttonVariants } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Russian', value: 'ru' },
	{ label: 'Japanese', value: 'ja' },
	{ label: 'Korean', value: 'ko' },
	{ label: 'Chinese', value: 'zh' },
] as const

const displayFormSchema = z.object({
	mode: z.enum(['light', 'dark']),
	font: z.enum(['sans', 'mono', 'serif']),
	language: z.string(),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

export function DisplayForm() {
	const setFont = useDisplayStore(store => store.setFont)

	const font = useDisplayStore(store => store.font)

	const { setTheme, theme } = useTheme()

	const defaultValues: Partial<DisplayFormValues> = {
		mode: theme as 'light' | 'dark',
		font: font,
		language: 'ru',
	}

	const form = useForm<DisplayFormValues>({
		resolver: zodResolver(displayFormSchema),
		mode: 'onChange',
		defaultValues,
	})

	function changeThemeHandler(e: string) {
		setTheme(e as Theme)
	}

	function changeFontHandler(e: ChangeEvent<HTMLSelectElement>) {
		setFont(e.target.value as EFont)
	}

	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="font"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Шрифт</FormLabel>
							<div className="relative w-max">
								<FormControl>
									<select
										className={cn(
											buttonVariants({ variant: 'outline' }),
											'w-[200px] appearance-none font-normal',
										)}
										{...field}
										onChange={e => {
											field.onChange(e)
											changeFontHandler(e)
										}}
									>
										<option value={EFont.sans}>
											{changeFirstLetterToUppercase(EFont.sans)}
										</option>
										<option value={EFont.mono}>
											{changeFirstLetterToUppercase(EFont.mono)}
										</option>
										<option value={EFont.serif}>
											{changeFirstLetterToUppercase(EFont.serif)}
										</option>
									</select>
								</FormControl>
								<ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
							</div>
							<FormDescription>
								Установите шрифт, который вы хотите использовать в приложении.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Язык</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'w-[200px] justify-between',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value
												? languages.find(
														language => language.value === field.value,
													)?.label
												: 'Выбрать язык'}
											<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Выбрать язык..." />
										<CommandEmpty>Язык не найден.</CommandEmpty>
										<CommandGroup>
											{languages.map(language => (
												<CommandItem
													value={language.label}
													key={language.value}
													onSelect={() => {
														form.setValue('language', language.value)
													}}
												>
													<CheckIcon
														className={cn(
															'mr-2 h-4 w-4',
															language.value === field.value
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
													{language.label}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Это язык, который будет использоваться в приложении.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mode"
					render={({ field }) => (
						<FormItem className="space-y-1">
							<FormLabel>Режим</FormLabel>
							<FormDescription>
								Выберите режим для информационной панели.
							</FormDescription>
							<FormMessage />
							<RadioGroup
								onValueChange={e => {
									field.onChange(e)
									changeThemeHandler(e)
								}}
								defaultValue={field.value}
								className="grid max-w-md grid-cols-2 gap-8 pt-2"
							>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="light" className="sr-only" />
										</FormControl>
										<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
											<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
												<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
													<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
												<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
													<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
												<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
													<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
											</div>
										</div>
										<span className="block w-full p-2 text-center font-normal">
											Светлый
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="dark" className="sr-only" />
										</FormControl>
										<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
											<div className="space-y-2 rounded-sm bg-slate-950 p-2">
												<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
													<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
												<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
													<div className="h-4 w-4 rounded-full bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
												<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
													<div className="h-4 w-4 rounded-full bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
											</div>
										</div>
										<span className="block w-full p-2 text-center font-normal">
											Темный
										</span>
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}