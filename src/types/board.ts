export interface BoardProps {
  id: string
  columns: []
}

export interface ColumnProps {
  id: string
  name: string
  cards?: { id: string; content: string }[]
  index: number
  color?: string
}

export interface CardProps {
  id: string
  content: string
  index: number
}