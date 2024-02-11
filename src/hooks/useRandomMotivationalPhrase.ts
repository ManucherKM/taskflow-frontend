import { i18next } from '@/locales'
import { getRandomInt } from '@/utils'

export interface IPhrase {
	phrase: string
	author: string
}

const phrases: IPhrase[] = [
	{
		phrase: i18next.t(
			'setting_goals_is_the_first_step_in_turning_the_invisible_into_the_visible',
		),
		author: i18next.t('tony_robbins'),
	},
	{
		phrase: i18next.t(
			'discipline_is_a_choice_between_what_you_want_now_and_what_you_want_the_most',
		),
		author: i18next.t('augusta_f_kantra'),
	},
	{
		phrase: i18next.t(
			'plans_are_only_good_intentions_if_they_dont_immediately_translate_into_hard_work',
		),
		author: i18next.t('peter_drucker'),
	},
	{
		phrase: i18next.t('the_future_depends_on_what_you_do_today'),
		author: i18next.t('mahatma_gandhi'),
	},
	{
		phrase: i18next.t(
			'if_you_work_very_hard_and_you_are_kind_amazing_things_will_happen',
		),
		author: i18next.t('conan_o_brien'),
	},
	{
		phrase: i18next.t(
			'you_dont_have_to_win_you_have_an_obligation_to_keep_trying_to_do_your_best_every_day',
		),
		author: i18next.t('marian_wright_edelman'),
	},
	{
		phrase: i18next.t(
			'when_you_live_for_a_strong_purpose_hard_work_is_not_an_option_its_a_necessity',
		),
		author: i18next.t('steve_pavelina'),
	},
	{
		phrase: i18next.t(
			'happiness_is_a_real_sense_of_fulfillment_that_comes_from_hard_work',
		),
		author: i18next.t('joseph_roland_barbera'),
	},
	{
		phrase: i18next.t(
			'this_is_the_real_secret_to_life_being_fully_engaged_in_what_you_are_doing_in_the_here_and_now_instead_of_calling_it_work_realize_that_it_is_play',
		),
		author: i18next.t('alan_wilson_watts'),
	},
	{
		phrase: i18next.t(
			'success_is_the_sum_of_small_efforts_repeated_day_in_and_day_out',
		),
		author: i18next.t('robert_collier'),
	},
	{
		phrase: i18next.t(
			'the_only_thing_standing_between_you_and_outrageous_success_is_continued_progress',
		),
		author: i18next.t('dan_waldschmidt'),
	},
]

export function useRandomMotivationalPhrase(): IPhrase {
	const idx = getRandomInt(0, phrases.length - 1)

	return phrases[idx]
}
