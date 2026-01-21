'use client'
import { Draggable } from '@hello-pangea/dnd'
import { Card as ShadCard, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { CardProps } from '../types/board'

export const TaskCard: React.FC<CardProps> = ({
  id,
  title,
  description,
  index,
  assigneeName
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ShadCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col justify-between transition-transform
            ${snapshot.isDragging ? 'scale-105 shadow-xl' : 'hover:shadow-lg'}
          `}
        >
          {/* Title */}
          <CardHeader className="pb-2 border-b border-gray-100">
            <h3 className="text-gray-800 font-semibold text-base">{title}</h3>
          </CardHeader>

          {/* Description */}
          <CardContent className="py-2 flex-1">
            <p className="text-gray-600 text-sm">{description || 'No description yet.'}</p>
          </CardContent>

          {/* Assigned to */}
          <CardFooter className="pt-2 border-t border-gray-100 text-sm text-gray-500">
            Assigned to: {assigneeName}
          </CardFooter>
        </ShadCard>
      )}
    </Draggable>
  )
}

export default TaskCard