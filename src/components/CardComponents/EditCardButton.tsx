'use client'
import { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { UPDATE_CARD } from '@/graphql/cards'
import { GET_USERS } from '@/graphql/users'
import { EditCardButtonProps } from '@/types/card'

export function EditCardButton({ 
  id, 
  initialTitle, 
  initialDescription, 
  initialAssignee 
}: EditCardButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [assignee, setAssignee] = useState(initialAssignee)

  const [updateCard, { loading }] = useMutation(UPDATE_CARD)
  const { data: usersData } = useSubscription(GET_USERS)

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Title is required')
      return
    }

    try {
      await updateCard({
        variables: {
          id,
          title: title.trim(),
          description: description.trim() || null,
          assignee: assignee || null,
        },
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update card:', err)
      alert('Failed to update card. Please try again.')
    }
  }

  const handleCancel = () => {
    setTitle(initialTitle)
    setDescription(initialDescription)
    setAssignee(initialAssignee)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        title="Edit card"
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
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900">Edit Card</h3>

        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter card title..."
            autoFocus
          />
        </div>

        {/* Description input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter description..."
            rows={4}
          />
        </div>

        {/* Assignee dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <select
            value={assignee || ""}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Unassigned</option>
            {usersData?.users?.map((user: { id: string; displayName: string }) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={loading || !title.trim()}
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

export default EditCardButton