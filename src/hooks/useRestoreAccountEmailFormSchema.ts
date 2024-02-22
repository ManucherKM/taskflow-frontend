import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRestoreAccountEmailFormSchema() {
	const { t } = useTranslation()

	return z.object({
		email: z
			.string()
			.email({
				message: t('enter_the_correct_email'),
			})
			.max(254, {
				message: t('enter_the_correct_email'),
			}),
	})
}

export type TRestoreAccountEmailFormSchema = z.infer<
	ReturnType<typeof useRestoreAccountEmailFormSchema>
>
