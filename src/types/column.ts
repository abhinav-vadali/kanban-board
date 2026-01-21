import { CardType } from './card'

export interface ColumnProps {
  id: string
  name: string
  position: number
  cards?: CardType[]
  index: number
  color?: string
}

export interface ColumnType {
  id: string
  name: string
  position: number
  index: number
  cards: CardType[]
}

export interface AddColumnButtonProps {
  boardId: string
  existingColumnsCount: number
}