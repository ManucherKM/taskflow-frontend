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

/** A component for application usage policy. */
export const TermsOfUse: FC = () => {
	const { t } = useTranslation()

	return (
		<>
			<NavBarBack />
			<div className="container py-6">
				<TypographyH2>{t('taskflow_application_terms_of_use')}</TypographyH2>
				<TypographyH3 className="mt-6">
					{t('1_general_provisions')}
				</TypographyH3>
				<TypographyP>
					{t(
						'11_these_terms_of_use_the_«terms»_govern_the_use_of_the_taskflow_application_the_«application»_developed_by_the_taskflowteam_the_«developer»',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'12_use_of_the_application_means_the_users_full_and_unconditional_consent_to_these_terms_and_conditions',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('2_subject_of_the_terms_and_conditions')}
				</TypographyH3>
				<TypographyP>
					{t(
						'21_the_developer_grants_the_user_a_nonexclusive_right_to_use_the_application_under_a_simple_nonexclusive_license',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'22_the_user_may_use_the_application_for_the_purpose_of_organizing_and_managing_tasks',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'23_the_user_may_not_transfer_lease_sell_or_otherwise_grant_the_rights_to_use_the_application_to_third_parties',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('3_rights_and_obligations_of_the_user')}
				</TypographyH3>
				<TypographyP>
					{t(
						'31_the_user_undertakes_to_use_the_application_in_accordance_with_its_purpose_and_these_terms',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'32_the_user_undertakes_not_to_perform_actions_that_may_violate_the_rights_of_the_developer_or_third_parties_including',
					)}
				</TypographyP>
				<Ul>
					<li>
						{t(
							'copy_distribute_sell_or_otherwise_make_available_to_third_parties_the_appendix_or_parts_thereof',
						)}
					</li>
					<li>
						{t('make_unauthorized_access_to_the_application_or_parts_thereof')}
					</li>
					<li>
						{t(
							'use_the_application_to_distribute_malicious_software_or_other_malicious_activity',
						)}
					</li>
				</Ul>
				<TypographyP>
					{t(
						'33_the_user_shall_be_liable_for_any_losses_incurred_by_himher_to_the_developer_or_third_parties_as_a_result_of_violation_of_these_terms',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('4_rights_and_obligations_of_the_developer')}
				</TypographyH3>
				<TypographyP>
					{t(
						'41_the_developer_undertakes_to_provide_the_user_with_the_application_in_proper_condition_and_properly_functioning',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'42_the_developer_has_the_right_to_unilaterally_make_changes_to_the_application_including_changes_to_its_functionality_interface_and_appearance_without_prior_notice_to_the_user',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'43_the_developer_has_the_right_to_suspend_or_terminate_the_users_access_to_the_application_if_the_user_violates_these_terms',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">
					{t('5_liability_of_the_parties')}
				</TypographyH3>
				<TypographyP>
					{t(
						'51_the_developer_shall_not_be_liable_for_any_losses_incurred_by_the_user_as_a_result_of_using_the_application_or_inability_to_use_it_unless_such_losses_were_caused_by_the_developers_illegal_actions',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'52_the_user_shall_be_liable_for_any_losses_caused_to_the_developer_or_third_parties_as_a_result_of_violation_of_these_terms',
					)}
				</TypographyP>
				<TypographyH3 className="mt-6">{t('6_final_provisions')}</TypographyH3>
				<TypographyP>
					{t(
						'61_these_terms_and_conditions_shall_be_governed_by_the_laws_of_the_russian_federation',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'62_all_disputes_arising_out_of_these_terms_shall_be_resolved_in_accordance_with_the_laws_of_the_russian_federation',
					)}
				</TypographyP>
				<TypographyP>
					{t(
						'63_these_terms_and_conditions_are_an_integral_part_of_the_agreement_concluded_between_the_user_and_the_developer_at_the_moment_of_downloading_the_application_to_the_users_device',
					)}
				</TypographyP>
				<TypographyP>{t('additional_terms_and_conditions')}</TypographyP>
				<Ul>
					<li>{t('the_app_is_provided_on_a_free_of_charge_basis')}</li>
					<li>{t('the_application_may_contain_advertisements')}</li>
					<li>
						{t(
							'the_developer_does_not_guarantee_uninterrupted_operation_of_the_application',
						)}
					</li>
				</Ul>
			</div>
		</>
	)
}
