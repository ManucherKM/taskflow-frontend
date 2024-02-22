import { useState } from 'react'

export function useStep<T>(steps: T[]) {
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

	return {
		nextStep,
		prevStep,
		step: steps[step],
	}
}
