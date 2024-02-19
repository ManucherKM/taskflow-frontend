import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffectSkipFirstRender, useLoader } from '@/hooks'
import { useBoardStore, useUpdateStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { DialogClose } from '@radix-ui/react-dialog'
import {
	MouseEvent,
	useEffect,
	useRef,
	useState,
	type FC,
	type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from './ui/use-toast'

export interface IUpdateStageProvider {
	children: ReactNode
}

export const UpdateStageProvider: FC<IUpdateStageProvider> = ({ children }) => {
	const { t } = useTranslation()

	const isShow = useUpdateStageStore(store => store.isShow)

	const setIsShow = useUpdateStageStore(store => store.setIsShow)

	const stage = useUpdateStageStore(store => store.stage)

	const setStage = useUpdateStageStore(store => store.setStage)

	const updateButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const loader = useLoader()

	const update = useUpdateStageStore(store => store.update)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function onSubmit() {
		if (!stage) {
			return
		}

		try {
			const updatedStage = await loader(update, { name })

			if (!updatedStage) {
				toast({
					title: t('failed_to_change_the_stage'),
				})

				return
			}

			const newBoard = {
				...activeBoard,
				stages: [
					...activeBoard.stages.map(pred => {
						if (pred._id === stage._id) {
							return {
								...pred,
								name,
							}
						}

						return pred
					}),
				],
			} as IDeepBoard

			setActiveBoard(newBoard)

			setIsShow(false)

			toast({
				title: t('stage_successfully_changed'),
			})
		} catch (e) {
			console.error(e)
		}
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		onSubmit()
	}

	useEffect(() => {
		if (!stage) return

		setName(stage.name)
	}, [stage])

	useEffectSkipFirstRender(() => {
		if (isShow) return

		if (stage === null) return

		setStage(null)
	}, [isShow])

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{t('change_stage')}</DialogTitle>
						<DialogDescription>
							{t('fill_out_the_form_to_change_the_stage')}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6 py-4">
						<Label htmlFor="name">
							{t('title')}
							<Input
								id="name"
								value={name}
								onChange={e => setName(e.target.value)}
								className="w-full mt-2"
								placeholder={t('the_plan_is_to') + '...'}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										updateButtonRef.current?.click()
									}
								}}
							/>
						</Label>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								ref={updateButtonRef}
								type="submit"
								disabled={!name.length}
								onClick={submitHandler}
							>
								{t('update')}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
