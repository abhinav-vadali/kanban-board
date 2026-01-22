import { ColumnType } from './column'
export interface BoardProps {
  id: string
  name: string
  color: string
  boardColumns: ColumnType[]
}

export interface DeleteAndEditBoardButtonProps {
  boardId: string
  boardName: string
}


