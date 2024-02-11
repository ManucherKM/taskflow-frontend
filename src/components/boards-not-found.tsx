import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Icons, TypographyP } from '.'

export const BoardsNotFound: FC = () => {
	const { t } = useTranslation()

	return (
		<>
			<Icons.moodPuzzled className="w-20 h-20" />
			<TypographyP className="!mt-0">
				{t('looks_like_you_dont_have_any_active_boards')}
			</TypographyP>
		</>
	)
}
