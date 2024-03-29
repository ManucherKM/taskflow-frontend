import { Otp, TypographyH3, toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export const RestoreAccountOTPForm: FC = () => {
	const { t } = useTranslation()

	const [otp, setOtp] = useState<number>(0)

	const loader = useLoader()

	const verificationOtp = useRestoreAccount(store => store.verificationOtp)

	const navigation = useNavigate()

	async function onSubmit() {
		try {
			const isSuccess = await loader(verificationOtp, otp)

			if (!isSuccess) {
				toast({
					title: t('invalid_one_time_code'),
				})
				return
			}

			navigation(ERoutes.restoreAccountPassword)
		} catch (e) {
			console.error(e)
		}
	}

	async function pasteHandler() {
		// Reading text from the user's buffer.
		const data = await navigator.clipboard.readText()

		// Place the copied text in the sent state.
		setOtp(Number(data))
	}

	useEffect(() => {
		if (otp.toString().length === 6) {
			onSubmit()
		}
	}, [otp])
	return (
		<div
			className="w-full flex flex-col justify-center items-center h-[calc(100vh-56px)] gap-6"
			onPaste={pasteHandler}
		>
			<TypographyH3>{t('enter_the_one_time_code')}</TypographyH3>

			<Otp length={6} onOtpChange={setOtp} otp={otp} />
		</div>
	)
}
