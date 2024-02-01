import { Theme } from '@/components'

export enum EFont {
	sans = 'sans',
	serif = 'serif',
	mono = 'mono',
}

export interface IDisplayStore {
	laguage: string

	font: `${EFont}`

	theme: Theme

	setTheme: (target: Theme) => void

	setFont: (target: `${EFont}`) => void

	setLanguage: (target: string) => void

	reset: () => void
}
