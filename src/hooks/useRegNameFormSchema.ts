import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRegNameFormSchema() {
	const { t } = useTranslation()

	return z.object({
		userName: z.string().min(2, {
			message: t('the_username_must_be_at_least_2_characters_long'),
		}),
	})
}
