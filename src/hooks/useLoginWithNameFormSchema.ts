import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useLoginWithNameFormSchema() {
	const { t } = useTranslation()

	return z.object({
		userName: z
			.string()
			.min(2, {
				message: t('the_username_must_be_at_least_2_characters_long'),
			})
			.max(30, {
				message: t('the_username_must_not_exceed_30_characters'),
			}),
		password: z.string().min(8, {
			message: t(
				'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
			),
		}),
	})
}
