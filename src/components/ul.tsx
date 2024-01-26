import { FC, ReactNode } from 'react'

export interface IUl {
	children: ReactNode
}

export const Ul: FC<IUl> = ({ children }) => {
	return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}
