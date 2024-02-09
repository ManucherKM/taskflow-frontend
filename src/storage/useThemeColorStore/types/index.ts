export type TThemeColor = 'zinc' | 'blue' | 'orange' | 'green' | 'rose'

export interface IThemeColorStoreStore {
	theme: TThemeColor

	setTheme: (theme: TThemeColor) => void
}
