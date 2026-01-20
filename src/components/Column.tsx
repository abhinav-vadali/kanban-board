import React from 'react'
import { Droppable, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard'
import { ColumnProps } from '../types/board'

// Add dragHandleProps explicitly to props
interface ColumnPropsWithHandle extends ColumnProps {
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const Column: React.FC<ColumnPropsWithHandle> = ({
  id,
  name,
  cards,
  color = '#E0E7FF',
  dragHandleProps,
}) => {
  return (
    <div
      className="flex flex-col rounded-xl p-4 shadow-md min-w-[250px] max-w-[300px] bg-opacity-90"
      style={{ backgroundColor: color }}
    >
      {/* Column header */}
      <div
        {...dragHandleProps} // attach header drag handle
        className="font-semibold text-lg mb-4 cursor-grab select-none"
      >
        {name}
      </div>

      {/* Cards droppable area */}
      <Droppable droppableId={id} type="CARD">
        {(droppableProvided, snapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`flex flex-col gap-3 min-h-[50px] p-1 ${
              snapshot.isDraggingOver ? 'bg-white/20 rounded-lg transition-all' : ''
            }`}
          >
            {cards && cards.length > 0 ? (
              cards.map((card, idx) => (
                <TaskCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  assignee={card.assignee}
                  index={idx}
                />
              ))
            ) : (
              <p className="text-gray-400 italic text-center py-4">
                You don’t have any cards yet.
              </p>
            )}

            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
