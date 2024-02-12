import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useLoginWithEmailFormSchema() {
	const { t } = useTranslation()

	return z.object({
		email: z.string().email({
			message: t('enter_the_correct_email'),
		}),
		password: z.string().min(8, {
			message: t(
				'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
			),
		}),
	})
}
