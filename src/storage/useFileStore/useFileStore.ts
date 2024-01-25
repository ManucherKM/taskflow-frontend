// Types
import { EFileStoreApiRoutes, type IFileStore } from './types'

// Utils
import axios from '@/config/axios'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'

/** With this hook you can access shared storage. */
export const useFileStore = create<IFileStore>(() => ({
	async uploadFiles(fileList) {
		try {
			const files = Array.from(fileList)

			const promises: Promise<AxiosResponse<{ id: string }>>[] = []

			for (const file of files) {
				const formData = new FormData()

				formData.append('file', file)

				promises[promises.length] = axios.post<{ id: string }>(
					EFileStoreApiRoutes.upload,
					formData,
				)
			}

			const response = await Promise.all(promises)

			const formatedResponse = response.map(res => res.data)

			return formatedResponse
		} catch (e) {
			console.error(e)
		}
	},
}))
