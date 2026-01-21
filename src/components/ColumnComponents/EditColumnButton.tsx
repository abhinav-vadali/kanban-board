'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COLUMN } from '@/graphql/columns'

interface EditColumnButtonProps {
  id: string
  initialName: string
}

export function EditColumnButton({ id, initialName }: EditColumnButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialName)

  const [updateColumn, { loading }] = useMutation(UPDATE_COLUMN)

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Column name is required')
      return
    }

    try {
      await updateColumn({
        variables: {
          id,
          name: name.trim(),
        },
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update column:', err)
      alert('Failed to update column. Please try again.')
    }
  }

  const handleCancel = () => {
    setName(initialName)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (!isEditing) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
        className="text-gray-600 hover:text-gray-800 transition-colors p-1"
        title="Edit column name"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
          />
        </svg>
      </button>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900">Edit Column Name</h3>

        {/* Name input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Column Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter column name..."
            autoFocus
          />
          <p className="mt-1 text-xs text-gray-500">
            Press Enter to save, Esc to cancel
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditColumnButton