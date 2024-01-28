import { useState } from 'react'
import { SlideLeft } from '..'
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
	const [step, setStep] = useState<number>(0)

	function nextStep() {
		if (steps[step + 1] !== undefined) {
			setStep(prev => prev + 1)
		}
	}

	function prevStep() {
		if (steps[step - 1] !== undefined) {
			setStep(prev => prev - 1)
		}
	}

	return (
		<>
			{steps[step] === ESteps.basis && (
				<SlideLeft>
					<UserBasisForm onNext={nextStep} />
				</SlideLeft>
			)}

			{steps[step] === ESteps.userName && (
				<SlideLeft>
					<UserNameForm onNext={nextStep} onPrev={prevStep} />{' '}
				</SlideLeft>
			)}

			{steps[step] === ESteps.other && (
				<SlideLeft>
					<UserOtherForm onPrev={prevStep} />{' '}
				</SlideLeft>
			)}
		</>
	)
}
