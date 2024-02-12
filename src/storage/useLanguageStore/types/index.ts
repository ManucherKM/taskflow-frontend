export type TLanguage =
	| 'en'
	| 'de'
	| 'fr'
	| 'uk'
	| 'tr'
	| 'es'
	| 'it'
	| 'ru'
	| 'pl'

export interface ILanguageStore {
	language: TLanguage

	setLanguage: (language: TLanguage) => void
}
