import { NavBarBack, Otp, SlideLeft, TypographyH3, toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useRestoreAccount, useStore } from '@/storage'
import { useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router'

export const RestoreAccountOTP: FC = () => {
	const [otp, setOtp] = useState<number>(0)
	const setLoading = useStore(store => store.setLoading)
	const verificationOtp = useRestoreAccount(store => store.verificationOtp)

	const navigation = useNavigate()

	async function onSubmit() {
		try {
			setLoading(true)

			const isSuccess = await verificationOtp(otp)

			if (!isSuccess) {
				toast({
					title: 'Неверный одноразовый код',
				})
				return
			}

			navigation(ERoutes.restoreAccountPassword)
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (otp.toString().length === 6) {
			onSubmit()
		}
	}, [otp])
	return (
		<div className="overflow-hidden">
			<NavBarBack />

			<SlideLeft>
				<div className="container">
					<div className="w-full flex flex-col justify-center items-center h-[calc(100vh-56px)] gap-6">
						<TypographyH3>Введите одноразовый код</TypographyH3>

						<Otp length={6} onOtpChange={setOtp} otp={otp} />
					</div>
				</div>
			</SlideLeft>
		</div>
	)
}
