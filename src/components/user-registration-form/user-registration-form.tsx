import { useState } from 'react'
import { UserBasisForm } from './user-basis-form'
import { UserNameForm } from './user-name-form'
import { UserOtherForm } from './user-other-form'

export enum ESteps {
	basis = 'basis',
	username = 'username',
	other = 'other',
}

const steps: ESteps[] = [ESteps.basis, ESteps.username, ESteps.other]

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
			{steps[step] === ESteps.basis && <UserBasisForm onNext={nextStep} />}

			{steps[step] === ESteps.username && (
				<UserNameForm onNext={nextStep} onPrev={prevStep} />
			)}

			{steps[step] === ESteps.other && <UserOtherForm onPrev={prevStep} />}
		</>
	)
}
