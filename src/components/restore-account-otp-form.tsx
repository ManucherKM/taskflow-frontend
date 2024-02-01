import { Otp, TypographyH3, toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router'

export const RestoreAccountOTPForm: FC = () => {
	const [otp, setOtp] = useState<number>(0)

	const loader = useLoader()

	const verificationOtp = useRestoreAccount(store => store.verificationOtp)

	const navigation = useNavigate()

	async function onSubmit() {
		try {
			const isSuccess = await loader(verificationOtp, otp)

			if (!isSuccess) {
				toast({
					title: 'Неверный одноразовый код',
				})
				return
			}

			navigation(ERoutes.restoreAccountPassword)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (otp.toString().length === 6) {
			onSubmit()
		}
	}, [otp])
	return (
		<div className="w-full flex flex-col justify-center items-center h-[calc(100vh-56px)] gap-6">
			<TypographyH3>Введите одноразовый код</TypographyH3>

			<Otp length={6} onOtpChange={setOtp} otp={otp} />
		</div>
	)
}
