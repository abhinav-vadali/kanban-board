'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_COLUMN } from '@/graphql/columns'
import { AddColumnButtonProps } from '../../types/column'

export function AddColumnButton({ boardId, existingColumnsCount }: AddColumnButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [createColumn, { loading }] = useMutation(CREATE_COLUMN)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await createColumn({
        variables: {
          board_id: boardId,
            name: title,
          position: existingColumnsCount + 1,
        },
      })
      setTitle('')
      setIsAdding(false)
    } catch (err) {
      console.error('Failed to create column:', err)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setIsAdding(false)
  }

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex-shrink-0 w-72 h-fit bg-white/50 hover:bg-white/80 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-4 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <span className="text-xl">+</span>
        <span className="font-medium">Add Column</span>
      </button>
    )
  }

  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter column name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}