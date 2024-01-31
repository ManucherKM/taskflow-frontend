interface IUrl {
	value: string
}

export interface IUser {
	firstName?: string
	lastName?: string
	avatar?: string
	email: string
	userName: string
	bio?: string
	birthday?: Date
	urls: IUrl[]
	language: string
	mode: string
	font: string
}

export interface IUserStore {
	user?: IUser

	getUser: () => Promise<boolean>

	update: (target: Partial<IUser>) => Promise<boolean>
}

export enum EUserStoreApiRoutes {
	getUser = '/api/user',
}
