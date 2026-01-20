'use client'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_CARD_POSITION } from '@/graphql/cards'
import { BoardProps, ColumnType } from '../types/board'
import { Column } from './Column'

// Pastel colors for columns
const pastelColors = ['#FFD1DC', '#FFEDD5', '#FFFACD', '#D5FFCC', '#CDE7FF', '#E3D5FF']

const Board: React.FC<BoardProps> = ({ id, name, boardColumns }) => {
  const [columns, setColumns] = useState<ColumnType[]>(boardColumns || [])
  const [updateCardPosition] = useMutation(UPDATE_CARD_POSITION)

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result
    if (!destination) return

    if (type === 'COLUMN') {
      // Move columns horizontally
      const newColumns = Array.from(columns)
      const [moved] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, moved)
      setColumns(newColumns)
      return
    }

    if (type === 'CARD') {
      // Move cards within/between columns
      const sourceCol = columns.find(c => c.id === source.droppableId)
      const destCol = columns.find(c => c.id === destination.droppableId)
      if (!sourceCol || !destCol) return

      const sourceCards = Array.from(sourceCol.cards)
      const destCards = sourceCol.id === destCol.id ? sourceCards : Array.from(destCol.cards)

      const [movingCard] = sourceCards.splice(source.index, 1)
      destCards.splice(destination.index, 0, movingCard)

      const newColumns = columns.map(c => {
        if (c.id === sourceCol.id) return { ...c, cards: sourceCards }
        if (c.id === destCol.id) return { ...c, cards: destCards }
        return c
      })

      setColumns(newColumns)

      // Persist to Nhost
      try {
        await updateCardPosition({
          variables: {
            id: movingCard.id,
            column_id: destCol.id,
            position: destination.index + 1,
          },
        })
      } catch (err) {
        console.error('Failed to update card position:', err)
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>

      {columns.length === 0 ? (
        <p className="text-gray-400 italic text-center py-8 w-full">
          No columns yet. Add a column to get started!
        </p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div
                className="flex gap-6 overflow-x-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((col: ColumnType, idx: number) => (
                  <Draggable draggableId={col.id} index={idx} key={col.id}>
                    {(colProvided) => (
                      <div
                        ref={colProvided.innerRef}
                        {...colProvided.draggableProps}
                        {...colProvided.dragHandleProps}
                      >
                        <Column
                          id={col.id}
                          name={col.name}
                          cards={col.cards}
                          position = {col.position}
                          index = {idx}
                          color={pastelColors[idx % pastelColors.length]}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}

export default Board
