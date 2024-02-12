import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useProfileFormSchema() {
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
			.optional(),
		lastName: z
			.string()
			.min(2, {
				message: t('last_name_must_contain_at_least_2_characters'),
			})
			.max(30, {
				message: t('last_name_must_contain_no_more_than_30_characters'),
			})
			.optional(),
		bio: z
			.string()
			.min(4, {
				message: t('the_biography_must_be_at_least_4_characters_long'),
			})
			.max(160, {
				message: t('the_biography_should_be_no_more_than_160_characters'),
			})
			.optional(),
		birthday: z.date().optional(),
		urls: z
			.array(
				z.object({
					value: z.string().url({ message: t('please_enter_a_valid_url') }),
				}),
			)
			.optional(),
	})
}
