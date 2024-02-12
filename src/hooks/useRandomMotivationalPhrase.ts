import { getRandomInt } from '@/utils'
import { useTranslation } from 'react-i18next'

export interface IPhrase {
	phrase: string
	author: string
}

export function useMotivationalPhrases() {
	const { t } = useTranslation()

	return [
		{
			phrase: t(
				'setting_goals_is_the_first_step_in_turning_the_invisible_into_the_visible',
			),
			author: t('tony_robbins'),
		},
		{
			phrase: t(
				'discipline_is_a_choice_between_what_you_want_now_and_what_you_want_the_most',
			),
			author: t('augusta_f_kantra'),
		},
		{
			phrase: t(
				'plans_are_only_good_intentions_if_they_dont_immediately_translate_into_hard_work',
			),
			author: t('peter_drucker'),
		},
		{
			phrase: t('the_future_depends_on_what_you_do_today'),
			author: t('mahatma_gandhi'),
		},
		{
			phrase: t(
				'if_you_work_very_hard_and_you_are_kind_amazing_things_will_happen',
			),
			author: t('conan_o_brien'),
		},
		{
			phrase: t(
				'you_dont_have_to_win_you_have_an_obligation_to_keep_trying_to_do_your_best_every_day',
			),
			author: t('marian_wright_edelman'),
		},
		{
			phrase: t(
				'when_you_live_for_a_strong_purpose_hard_work_is_not_an_option_its_a_necessity',
			),
			author: t('steve_pavelina'),
		},
		{
			phrase: t(
				'happiness_is_a_real_sense_of_fulfillment_that_comes_from_hard_work',
			),
			author: t('joseph_roland_barbera'),
		},
		{
			phrase: t(
				'this_is_the_real_secret_to_life_being_fully_engaged_in_what_you_are_doing_in_the_here_and_now_instead_of_calling_it_work_realize_that_it_is_play',
			),
			author: t('alan_wilson_watts'),
		},
		{
			phrase: t(
				'success_is_the_sum_of_small_efforts_repeated_day_in_and_day_out',
			),
			author: t('robert_collier'),
		},
		{
			phrase: t(
				'the_only_thing_standing_between_you_and_outrageous_success_is_continued_progress',
			),
			author: t('dan_waldschmidt'),
		},
	] as IPhrase[]
}

export function useRandomMotivationalPhrase(): IPhrase {
	const phrases = useMotivationalPhrases()

	const idx = getRandomInt(0, phrases.length - 1)

	return phrases[idx]
}
