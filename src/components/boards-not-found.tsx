import type { FC } from 'react'
import { Icons, TypographyP } from '.'

export const BoardsNotFound: FC = () => {
	return (
		<>
			<Icons.moodPuzzled className="w-20 h-20" />
			<TypographyP className="!mt-0">
				Похоже что у вас нет активных досок
			</TypographyP>
		</>
	)
}
