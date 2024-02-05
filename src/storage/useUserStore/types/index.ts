interface IUrl {
	value: string
}

export interface IUser {
	_id: string
	firstName?: string
	lastName?: string
	email: string
	userName: string
	bio?: string
	birthday?: Date
	urls: IUrl[]
}

export interface IUserStore {
	user?: IUser

	getUser: () => Promise<boolean>

	update: (target: Partial<IUser>) => Promise<boolean>
}

export enum EUserStoreApiRoutes {
	getUser = '/api/user',
}
