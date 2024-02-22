import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useRestoreAccountPasswordFormSchema() {
	const { t } = useTranslation()

	return z.object({
		password: z
			.string()
			.min(8, {
				message: t(
					'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
				),
			})
			.max(32, {
				message: t(
					'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
				),
			}),
	})
}

export type TRestoreAccountPasswordFormSchema = z.infer<
	ReturnType<typeof useRestoreAccountPasswordFormSchema>
>
