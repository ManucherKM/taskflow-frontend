export interface IFileStore {
	uploadFiles: (files: FileList) => Promise<{ id: string }[] | undefined>
}

export enum EFileStoreApiRoutes {
	/** Route for user authorization. */
	upload = '/api/file',
}
