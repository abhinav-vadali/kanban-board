'use client'
import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Card as ShadCard, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { CatIcon } from 'lucide-react'
import { CardProps } from '../types/board'



export const Card: React.FC<CardProps> = ({ id, content, index }) => {
  const [comments, setComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')

  const addComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, newComment.trim()])
    setNewComment('')
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ShadCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white shadow-md border border-gray-200 rounded-xl p-4 transition-transform ${
            snapshot.isDragging ? 'scale-105 shadow-xl' : ''
          }`}
        >
          <CardHeader>
            <div className="font-medium text-gray-800">{content}</div>
          </CardHeader>

          <CardContent className="mt-2">
            {comments.length > 0 && (
              <ul className="mb-2 text-sm text-gray-600 space-y-1">
                {comments.map((c, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <CatIcon className="w-4 h-4 text-gray-400" /> {c}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add comment..."
                className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={addComment}
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>
          </CardContent>

          <CardFooter className="mt-2 text-xs text-gray-400">
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </CardFooter>
        </ShadCard>
      )}
    </Draggable>
  )
}
