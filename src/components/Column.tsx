'use client'
import React from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Card } from './ui/card'
import { ColumnProps } from '../types/board'

export const Column: React.FC<ColumnProps> = ({
  id,
  name,
  cards,
  index,
  color = '#E0E7FF', // default pastel per column
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col rounded-xl p-4 shadow-md min-w-[250px] max-w-[300px] bg-opacity-90"
          style={{ backgroundColor: color, ...provided.draggableProps.style }}
        >
          {/* Column header */}
          <div
            {...provided.dragHandleProps}
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
                className={`flex flex-col gap-3 min-h-[50px] ${
                  snapshot.isDraggingOver ? 'bg-white/20 rounded-lg transition-all' : ''
                } p-1`}
              >
                {cards.map((card) => (
                  <Card key={card.id} id={card.id} content={card.content}/>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
