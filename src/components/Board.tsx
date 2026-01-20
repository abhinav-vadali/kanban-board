import { DragDropContext } from '@hello-pangea/dnd'
import { Column } from './Column'
import { useMutation } from '@apollo/client'
import { UPDATE_CARD_POSITION } from '@/graphql/cards'
import { BoardProps } from '../types/board'

export default function Board({ columns }): React.FC<BoardProps> {
  const [updateCard] = useMutation(UPDATE_CARD_POSITION)

  const onDragEnd = async (result) => {
    if (!result.destination) return

    const { draggableId, destination, source } = result
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    const destColumn = columns.find(
      c => c.id === destination.droppableId
    )

    const prev = destColumn.cards[destination.index - 1]
    const next = destColumn.cards[destination.index]

    let position = 0
    if (prev && next) position = (prev.position + next.position) / 2
    else if (prev) position = prev.position + 1
    else if (next) position = next.position / 2
    else position = 0

    await updateCard({
      variables: {
        id: draggableId,
        column_id: destination.droppableId,
        position,
      },
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto">
        {columns.map(col => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DragDropContext>
  )
}
