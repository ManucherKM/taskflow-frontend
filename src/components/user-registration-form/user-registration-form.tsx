import { AnimatePresence, motion } from 'framer-motion'
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
		<AnimatePresence mode="wait">
			{steps[step] === ESteps.basis && (
				<motion.div
					key={ESteps.basis}
					initial={{ opacity: 0, x: '-100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '-100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserBasisForm onNext={nextStep} />
				</motion.div>
			)}

			{steps[step] === ESteps.username && (
				<motion.div
					key={ESteps.username}
					initial={{ opacity: 0, x: '-100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '-100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserNameForm onNext={nextStep} onPrev={prevStep} />{' '}
				</motion.div>
			)}

			{steps[step] === ESteps.other && (
				<motion.div
					key={ESteps.other}
					initial={{ opacity: 0, x: '-100px' }}
					animate={{ opacity: 1, x: '0' }}
					exit={{ opacity: 0, x: '-100px' }}
					transition={{ duration: '0.2' }}
				>
					<UserOtherForm onPrev={prevStep} />{' '}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
