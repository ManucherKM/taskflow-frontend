import { FC, ReactNode } from 'react'

export interface ILanguageProvide {
	children: ReactNode
}

export const LanguageProvide: FC<ILanguageProvide> = ({ children }) => {
	const user = useUserStore

	return <div>{children}</div>
}
