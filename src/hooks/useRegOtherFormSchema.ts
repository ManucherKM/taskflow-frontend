import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRegOtherFormSchema() {
	const { t } = useTranslation()

	return z.object({
		firstName: z
			.string()
			.min(2, {
				message: t('the_name_must_contain_at_least_2_characters'),
			})
			.max(30, {
				message: t('the_name_should_be_no_more_than_30_characters'),
			})
			.optional()
			.or(z.literal(''))
			.transform(e => (e === '' ? undefined : e)),

		lastName: z
			.string()
			.min(2, {
				message: t('last_name_must_contain_at_least_2_characters'),
			})
			.max(30, {
				message: t('last_name_must_contain_no_more_than_30_characters'),
			})
			.optional()
			.or(z.literal(''))
			.transform(e => (e === '' ? undefined : e)),
	})
}

export type TRegOtherFormSchema = z.infer<
	ReturnType<typeof useRegOtherFormSchema>
>
