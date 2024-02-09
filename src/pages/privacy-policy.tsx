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

/** A component with the application's privacy policy. */
export const PrivacyPolicy: FC = () => {
	return (
		<>
			<NavBarBack />
			<div className="container py-6">
				<TypographyH2>Политика конфиденциальности TaskFlow</TypographyH2>
				<TypographyH3 className="mt-6">Введение</TypographyH3>
				<TypographyP>
					TaskFlow - это приложение для управления задачами, которое позволяет
					пользователям создавать, отслеживать и завершать задачи. Эта политика
					конфиденциальности описывает, как TaskFlow собирает, использует и
					раскрывает информацию о пользователях.
				</TypographyP>
				<TypographyH3 className="mt-6">Сбор информации</TypographyH3>
				<TypographyP>
					TaskFlow собирает информацию о пользователях, когда они регистрируются
					в приложении, создают задачи или взаимодействуют с ним иным образом.
					Эта информация может включать:
				</TypographyP>
				<Ul>
					<li>Предоставлять услуги TaskFlow</li>
					<li>
						Отправлять пользователям уведомления и маркетинговые материалы
					</li>
					<li>Анализировать использование приложения</li>
					<li>Предоставлять поддержку пользователям</li>
				</Ul>
				<TypographyP>
					TaskFlow не будет продавать или передавать информацию о пользователях
					третьим лицам без их согласия, за исключением случаев, когда это
					необходимо для предоставления услуг TaskFlow или для соблюдения
					закона.
				</TypographyP>

				<TypographyH3 className="mt-6">Раскрытие информации</TypographyH3>
				<TypographyP>
					TaskFlow может раскрывать информацию о пользователях в следующих
					случаях:
				</TypographyP>
				<Ul>
					<li>С согласия пользователя</li>
					<li>В соответствии с законом</li>
					<li>Чтобы защитить права или собственность TaskFlow</li>
					<li>
						Чтобы предотвратить или расследовать мошенничество или другие
						незаконные действия
					</li>
				</Ul>

				<TypographyH3 className="mt-6">Контроль над информацией</TypographyH3>
				<TypographyP>
					Пользователи могут просматривать, обновлять или удалять информацию о
					себе, войдя в свой аккаунт TaskFlow.{' '}
				</TypographyP>
				<TypographyH3 className="mt-6">Безопасность информации</TypographyH3>
				<TypographyP>
					TaskFlow принимает меры безопасности для защиты информации о
					пользователях, включая:
				</TypographyP>
				<Ul>
					<li>
						Использование шифрования для защиты информации, передаваемой через
						Интернет
					</li>
					<li>
						Ограничение доступа к информации о пользователях только
						уполномоченным сотрудникам
					</li>
					<li>Регулярное обновление программного обеспечения безопасности</li>
				</Ul>

				<TypographyH3 className="mt-6">
					Изменения в политике конфиденциальности
				</TypographyH3>
				<TypographyP>
					TaskFlow может время от времени вносить изменения в эту политику
					конфиденциальности. Все изменения будут опубликованы на этой странице.
				</TypographyP>
				<TypographyH3 className="mt-6">Контактная информация</TypographyH3>
				<TypographyP>
					Если у вас есть вопросы или опасения по поводу политики
					конфиденциальности TaskFlow, вы можете связаться с нами по адресу:
					taskflowteam@gmail.com
				</TypographyP>
			</div>
		</>
	)
}
