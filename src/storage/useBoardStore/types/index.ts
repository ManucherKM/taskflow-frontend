// Types
import { IStage } from '@/storage/useStageStore/types'
import { IUser } from '@/storage/useUserStore/types'

/** User board interface */
export interface IBoard {
	/** Unique board identifier. */
	_id: string

	/** Board name */
	name: string

	/** Flag indicating whether the board is a favorite. */
	isFavorite: boolean

	/** Board stage identifiers */
	stages: string[]

	/** Board admins identifiers */
	admins: string[]

	/** Board users identifiers */
	users: string[]

	/** Date of board creation */
	createdAt: string

	/** Date the board was last updated. */
	updatedAt: string
}

/**
 * Interface for complete information about the board, including its stages and
 * stage tasks.
 */
export interface IDeepBoard extends Omit<IBoard, 'stages'> {
	/** Details of the stages. */
	stages: IStage[]
}

/** Type for board data that can be changed. */
export type IUpdateBoard = Partial<
	Omit<IBoard, '_id' | 'createdAt' | 'updatedAt'>
>

/** Interface for board storage. */
export interface IBoardStore {
	/** User boards. */
	boards: IBoard[]

	/** Active User Board. */
	activeBoard: IDeepBoard | null

	/**
	 * Function for changing the active board.
	 *
	 * @param activeBoard The board to replace the currently active board with.
	 */
	setActiveBoard: (activeBoard: IDeepBoard) => void

	/**
	 * Function for changing the user boards.
	 *
	 * @param boards Boards to replace the user's current boards with.
	 */
	setBoards: (boards: IBoard[]) => void

	/**
	 * Function to retrieve all of the user's boards.
	 *
	 * @returns Board list or nothing
	 */
	getAllBoards: () => Promise<IBoard[] | undefined>

	/**
	 * Function to get complete information about the board.
	 *
	 * @param boardId Board identifier
	 * @returns Full information about the board or nothing at all.
	 */
	getDeepBoard: (boardId: string) => Promise<IDeepBoard | undefined>

	/**
	 * Function to retrieve all boards by their name.
	 *
	 * @param name The name on the basis of which the search will be performed.
	 * @returns Board list or nothing
	 */
	getAllByName: (name: string) => Promise<IBoard[] | undefined>

	/**
	 * A function to create a board.
	 *
	 * @param createDto Parameters required for create board.
	 * @returns Board or nothing
	 */
	create: (createDto: { name: string }) => Promise<IBoard | undefined>

	/**
	 * Function to change the board.
	 *
	 * @param boardId Board identifier
	 * @param updateDto Parameters required for update board.
	 * @returns Board or nothing
	 */
	update: (
		boardId: string,
		updateDto: IUpdateBoard,
	) => Promise<IBoard | undefined>

	/**
	 * A function to invite a user to the board.
	 *
	 * @param boardId Board identifier
	 * @returns A modified board or nothing.
	 */
	inviteToDashboard: (boardId: string) => Promise<IBoard | undefined>

	/**
	 * Function to get board users.
	 *
	 * @param boardId Board identifier
	 * @returns User list or nothing
	 */
	getBoardUsers: (boardId: string) => Promise<IUser[] | undefined>

	/**
	 * Function for leaving the board.
	 *
	 * @param boardId Board identifier
	 * @returns A modified board or nothing.
	 */
	leave: (boardId: string) => Promise<IBoard | undefined>

	/**
	 * Function for remove board admin.
	 *
	 * @param userId User identifier
	 * @param boardId Board identifier
	 * @returns A modified board or nothing.
	 */
	removeAdmin: (userId: string, boardId: string) => Promise<IBoard | undefined>

	/**
	 * Function for add board admin.
	 *
	 * @param userId User identifier
	 * @param boardId Board identifier
	 * @returns A modified board or nothing.
	 */
	addAdmin: (userId: string, boardId: string) => Promise<IBoard | undefined>

	/**
	 * Function for removing the board.
	 *
	 * @param boardId Board identifier
	 * @returns The result of the board's success.
	 */
	remove: (boardId: string) => Promise<boolean>
}

/** Routes for api requests to the board store. */
export enum EBoardStoreApiRoutes {
	/** Route for getting all of the user's boards. */
	all = '/api/board/all',

	/** Route to retrieve all user boards by name. */
	name = '/api/board/name',

	/** Main board route */
	main = '/api/board',

	/** Route for complete information about the board. */
	deep = '/api/board/deep',

	/** Route to get off the board. */
	leave = '/api/board/leave',

	/** Route for the board invitation. */
	inviteToDashboard = '/api/board/invite',

	/** Route for the get board members. */
	members = '/api/board/users',

	/** Route for remove board admin */
	removeAdmin = '/api/board/admin/remove',

	/** Route for add board admin */
	addAdmin = '/api/board/admin/add',
}
