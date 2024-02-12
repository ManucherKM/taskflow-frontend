import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRestoreAccountEmailFormSchema() {
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
	})
}
