export interface CardType {
    id: string
    title: string
  description: string
  index: number
  assignee: string
  assigneeName: string
}

export interface CardProps {
  id: string
  title: string
  description: string
  index: number
  assignee: string
  assigneeName: string
}

export interface DeleteCardProps {
  id: string
}

export interface EditCardButtonProps {
  id: string
  initialTitle: string
  initialDescription: string
  initialAssignee: string
}