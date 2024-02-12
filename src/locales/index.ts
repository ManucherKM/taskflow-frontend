import { useLanguageStore } from '@/storage'
import i18next from 'i18next'
import de from './de/global.json'
import en from './en/global.json'
import es from './es/global.json'
import fr from './fr/global.json'
import it from './it/global.json'
import pl from './pl/global.json'
import ru from './ru/global.json'
import tr from './tr/global.json'
import uk from './uk/global.json'

i18next.init({
	lng: useLanguageStore.getState().language,
	resources: {
		ru: {
			translation: ru,
		},
		en: {
			translation: en,
		},
		de: {
			translation: de,
		},
		fr: {
			translation: fr,
		},
		es: {
			translation: es,
		},
		it: {
			translation: it,
		},
		uk: {
			translation: uk,
		},
		tr: {
			translation: tr,
		},
		pl: {
			translation: pl,
		},
	},
})

export { i18next }
