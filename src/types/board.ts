export interface BoardProps {
  id: string
  name: string
  color: string
  boardColumns: ColumnType[]
}

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

export interface CardType {
    id: string
    title: string
  description: string
  index: number
  assignee: string
}

export interface CardProps {
  id: string
  title: string
  description: string
  index: number
  assignee: string
}