import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRegBasisFormSchema() {
	const { t } = useTranslation()

	return z.object({
		email: z
			.string()
			.regex(
				/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
				{
					message: t('enter_the_correct_email'),
				},
			),
		password: z.string().min(8, {
			message: t(
				'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
			),
		}),
	})
}
