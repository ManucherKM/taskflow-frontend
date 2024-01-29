import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBoardStore } from '@/storage'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRef, useState, type FC, type ReactNode } from 'react'
import { Icons, toast } from '.'

export interface ICreateBoardProvider {
	children: ReactNode
}

export const CreateBoardProvider: FC<ICreateBoardProvider> = ({ children }) => {
	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)

	const create = useBoardStore(store => store.create)

	async function onSubmit() {
		try {
			setLoading(true)

			const isSuccess = await create({ name })

			if (!isSuccess) {
				toast({
					title: 'Не удалось создать доску',
				})
			}
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	function submitHandler() {
		onSubmit()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				{isLoading && (
					<div className="absolute w-full h-full flex justify-center items-center z-[100] bg-black bg-opacity-50">
						<Icons.spinner className="animate-spin" />
					</div>
				)}
				<DialogHeader>
					<DialogTitle>Новая доска</DialogTitle>
					<DialogDescription>
						Заполните форму чтобы создать новую доску.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-6 py-4">
					<Label htmlFor="name">
						Название
						<Input
							id="name"
							value={name}
							onChange={e => setName(e.target.value)}
							className="w-full mt-2"
							placeholder="Горящие арбузы"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									createButtonRef.current?.click()
								}
							}}
						/>
					</Label>
					<Label>
						Изображение <span className="text-red-400">*</span>
						<Input
							defaultValue="Загрузить"
							className="mt-2 cursor-pointer "
							readOnly
						/>
					</Label>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							ref={createButtonRef}
							type="submit"
							disabled={!name.length}
							onClick={submitHandler}
						>
							Создать
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
