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

import {
	useDisplayStore,
	useLanguageStore,
	useThemeColorStore,
} from '@/storage'
import { EFont } from '@/storage/useDisplayStore/types'
import { TLanguage } from '@/storage/useLanguageStore/types'
import { TThemeColor } from '@/storage/useThemeColorStore/types'
import { changeFirstLetterToUpperCase } from '@/utils'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MiniBoard } from './mini-board'
import { buttonVariants } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'Français', value: 'fr' },
	{ label: 'Deutsch', value: 'de' },
	{ label: 'Español', value: 'es' },
	{ label: 'Polski', value: 'pl' },
	{ label: 'Русский', value: 'ru' },
	{ label: 'Italiano', value: 'it' },
	{ label: 'Український', value: 'uk' },
	{ label: 'Türkçe', value: 'tr' },
] as const

const displayFormSchema = z.object({
	mode: z.enum(['light', 'dark']),
	theme: z.enum(['zinc', 'rose', 'blue', 'green', 'orange']),
	font: z.enum(['sans', 'mono', 'serif']),
	language: z.enum(['en', 'fr', 'de', 'pl', 'tr', 'ru', 'es', 'it', 'uk']),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

export function DisplayForm() {
	const { t, i18n } = useTranslation()

	const setFont = useDisplayStore(store => store.setFont)

	const storeLanguage = useLanguageStore(store => store.language)
	const setStoreLanguage = useLanguageStore(store => store.setLanguage)

	const font = useDisplayStore(store => store.font)

	const setThemeColor = useThemeColorStore(store => store.setTheme)

	const { setTheme, theme } = useTheme()

	const defaultValues: Partial<DisplayFormValues> = {
		mode: theme as 'light' | 'dark',
		font: font,
		language: storeLanguage,
		theme: 'zinc',
	}

	const form = useForm<DisplayFormValues>({
		resolver: zodResolver(displayFormSchema),
		mode: 'onChange',
		defaultValues,
	})

	function changeThemeModeHandler(e: string) {
		setTheme(e as Theme)
	}

	function changeThemeHandler(e: string) {
		setThemeColor(e as TThemeColor)
	}

	function changeFontHandler(e: ChangeEvent<HTMLSelectElement>) {
		setFont(e.target.value as EFont)
	}

	function changeLanguageHandler(lang: TLanguage) {
		i18n.changeLanguage(lang)
		setStoreLanguage(lang)
	}

	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="font"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('font')}</FormLabel>
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
											{changeFirstLetterToUpperCase(EFont.sans)}
										</option>
										<option value={EFont.mono}>
											{changeFirstLetterToUpperCase(EFont.mono)}
										</option>
										<option value={EFont.serif}>
											{changeFirstLetterToUpperCase(EFont.serif)}
										</option>
									</select>
								</FormControl>
								<ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
							</div>
							<FormDescription>
								{t('set_the_font_you_want_to_use_in_the_application')}
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
							<FormLabel>{t('language')}</FormLabel>
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
												: t('select_language')}
											<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder={t('select_language') + '...'} />
										<CommandEmpty>{t('language_not_found')}</CommandEmpty>
										<CommandGroup>
											{languages.map(language => (
												<CommandItem
													value={language.label}
													key={language.value}
													onSelect={() => {
														form.setValue('language', language.value)
														changeLanguageHandler(language.value)
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
								{t('this_is_the_language_that_will_be_used_in_the_application')}
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
							<FormLabel>{t('mode')}</FormLabel>
							<FormDescription>
								{t('select_the_mode_for_the_information_panel')}
							</FormDescription>
							<FormMessage />
							<RadioGroup
								onValueChange={e => {
									field.onChange(e)
									changeThemeModeHandler(e)
								}}
								defaultValue={field.value}
								className="grid max-w-md grid-cols-2 gap-8 pt-2"
							>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="light" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-[#ecedef]"
											modal="bg-white"
											skeleton="bg-[#ecedef]"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('bright')}
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="dark" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-slate-950"
											modal="bg-slate-800"
											skeleton="bg-slate-400"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('dark')}
										</span>
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem className="space-y-1">
							<FormLabel>{t('theme')}</FormLabel>
							<FormDescription>
								{t('select_a_theme_for_the_dashboard')}
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
											<RadioGroupItem value="zinc" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-background"
											modal="bg-transperent"
											modalBorder="border"
											skeleton="bg-accent"
											className="zinc"
										/>
										<span className="block  w-full p-2 text-center font-normal">
											{t('gray')}
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="rose" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-background"
											modal="bg-card"
											modalBorder="border"
											skeleton="bg-[#e11d48]"
											className="rose"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('scarlet')}
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="blue" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-background"
											modal="bg-card"
											modalBorder="border"
											skeleton="bg-[#2563eb]"
											className="blue"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('blue')}
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="orange" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-background"
											modal="bg-card"
											modalBorder="border"
											skeleton="bg-[#f97316]"
											className="orange"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('orange')}
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="green" className="sr-only" />
										</FormControl>
										<MiniBoard
											bg="bg-background"
											modal="bg-card"
											modalBorder="border"
											skeleton="bg-[#16a34a]"
											className="green"
										/>
										<span className="block w-full p-2 text-center font-normal">
											{t('green')}
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
