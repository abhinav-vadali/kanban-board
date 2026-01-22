'use client'
import { Draggable } from '@hello-pangea/dnd'
import { CardProps } from '../../types/card'
import DeleteCardButton from './DeleteCardButton'
import EditCardButton from './EditCardButton'

export const TaskCard: React.FC<CardProps> = ({
  id,
  title,
  description,
  index,
  assignee,
  assigneeName
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative mb-3"
        >
          {/* Delete button */}
          <div className="absolute -top-2 -right-2 z-20">
            <DeleteCardButton id={id} />
          </div>

          {/* Card content */}
          <div
            className={`bg-white shadow-md border border-gray-200 rounded-lg p-4 transition-transform
              ${snapshot.isDragging ? 'scale-105 shadow-xl' : 'hover:shadow-lg'}
            `}
          >
            {/* Title with edit button */}
            <div className="pb-2 border-b border-gray-100">
              <h3 className="text-gray-800 font-semibold text-base">{title}<EditCardButton 
                id={id}
                initialTitle={title}
                initialDescription={description || ''}
                initialAssignee={assignee || ''}
              /></h3>
            </div>
            
            {/* Description */}
            <div className="py-2 flex-1">
              <p className="text-gray-600 text-sm">{description || 'No description yet.'}</p>
            </div>

            {/* Assigned to */}
            <div className="pt-2 border-t border-gray-100 text-sm text-gray-500">
              Assigned to: {assigneeName}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard