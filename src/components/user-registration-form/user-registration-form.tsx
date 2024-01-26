import { motion } from 'framer-motion'
import { useState } from 'react'
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
				<motion.div
					key={'registration-form-basis'}
					initial={{ opacity: 0, x: '100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserBasisForm onNext={nextStep} />
				</motion.div>
			)}

			{steps[step] === ESteps.userName && (
				<motion.div
					key={'registration-form-user-name'}
					initial={{ opacity: 0, x: '100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserNameForm onNext={nextStep} onPrev={prevStep} />{' '}
				</motion.div>
			)}

			{steps[step] === ESteps.other && (
				<motion.div
					key={'registration-form-other'}
					initial={{ opacity: 0, x: '100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserOtherForm onPrev={prevStep} />{' '}
				</motion.div>
			)}
		</>
	)
}
