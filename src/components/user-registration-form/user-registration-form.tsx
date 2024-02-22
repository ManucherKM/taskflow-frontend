import { useStep } from '@/hooks'
import { SlideLeft } from '../slide-left'
import { UserBasisForm } from './user-basis-form'
import { UserNameForm } from './user-name-form'
import { UserOtherForm } from './user-other-form'

export enum ESteps {
	basis = 'basis',
	userName = 'userName',
	other = 'other',
}

const steps: ESteps[] = [ESteps.basis, ESteps.userName, ESteps.other]

export function UserRegistrationForm() {
	const { nextStep, prevStep, step } = useStep(steps)

	return (
		<SlideLeft key={step}>
			{step === ESteps.basis && <UserBasisForm onNext={nextStep} />}
			{step === ESteps.userName && (
				<UserNameForm onNext={nextStep} onPrev={prevStep} />
			)}
			{step === ESteps.other && <UserOtherForm onPrev={prevStep} />}
		</SlideLeft>
	)
}
