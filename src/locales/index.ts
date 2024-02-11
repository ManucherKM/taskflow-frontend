import i18next from 'i18next'
import ru from './ru/global.json'

i18next.init({
	lng: 'ru',
	debug: true,
	resources: {
		ru: {
			translation: ru,
		},
	},
})

export { i18next }
