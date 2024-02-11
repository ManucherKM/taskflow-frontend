// Types
import type { FC } from 'react'

// Components
import {
	NavBarBack,
	TypographyH2,
	TypographyH3,
	TypographyP,
	Ul,
} from '@/components'
import { useTranslation } from 'react-i18next'

/** A component with the application's privacy policy. */
export const PrivacyPolicy: FC = () => {
	const { t } = useTranslation()

	return (
		<>
			<NavBarBack />
			<div className="container py-6">
				<TypographyH2>{t('taskflow_privacy_policy')}</TypographyH2>
				<TypographyH3 className="mt-6">{t('introduction')}</TypographyH3>
				<TypographyP>
					{t(
						'taskflow_is_a_task_management_application_that_allows_users_to_create_track_and_complete_tasks_this_privacy_policy_describes_how_taskflow_collects_uses_and_discloses_information_about_users',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('information_gathering')}
				</TypographyH3>
				<TypographyP>
					{t(
						'taskflow_collects_information_about_users_when_they_register_with_the_application_create_tasks_or_otherwise_interact_with_it_this_information_may_include',
					)}
				</TypographyP>
				<Ul>
					<li>{t('provide_taskflow_services')}</li>
					<li>{t('send_notifications_and_marketing_materials_to_users')}</li>
					<li>{t('analyze_the_use_of_the_application')}</li>
					<li>{t('provide_support_to_users')}</li>
				</Ul>
				<TypographyP>
					{t(
						'taskflow_will_not_sell_or_share_user_information_with_third_parties_without_consent_except_as_necessary_to_provide_taskflow_services_or_to_comply_with_the_law',
					)}
				</TypographyP>

				<TypographyH3 className="mt-6">
					{t('disclosure_of_information')}
				</TypographyH3>
				<TypographyP>
					{t('taskflow_may_disclose_user_information_in_the_following_cases')}
				</TypographyP>
				<Ul>
					<li>{t('s_consent')}</li>
					<li>{t('in_accordance_with_the_law')}</li>
					<li>{t('to_protect_taskflows_rights_or_property')}</li>
					<li>
						{t('to_prevent_or_investigate_fraud_or_other_illegal_activities')}
					</li>
				</Ul>

				<TypographyH3 className="mt-6">{t('information_control')}</TypographyH3>
				<TypographyP>
					{t(
						'users_can_view_update_or_delete_their_information_by_logging_into_their_taskflow_account',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('information_security')}
				</TypographyH3>
				<TypographyP>
					{t(
						'taskflow_has_security_measures_in_place_to_protect_user_information_including',
					)}
				</TypographyP>
				<Ul>
					<li>
						{t(
							'using_encryption_to_protect_information_transmitted_over_the_internet',
						)}
					</li>
					<li>
						{t(
							'restrict_access_to_user_information_to_authorized_employees_only',
						)}
					</li>
					<li>{t('regular_updates_of_security_software')}</li>
				</Ul>

				<TypographyH3 className="mt-6">
					{t('changes_to_the_privacy_policy')}
				</TypographyH3>
				<TypographyP>
					{t(
						'taskflow_may_change_this_privacy_policy_from_time_to_time_any_changes_will_be_posted_on_this_page',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">{t('contact_information')}</TypographyH3>
				<TypographyP>
					{t(
						'if_you_have_questions_or_concerns_about_taskflows_privacy_policy_you_can_contact_us_at_taskflowteam_gmailcom',
					)}
				</TypographyP>
			</div>
		</>
	)
}
