'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { DELETE_BOARD, UPDATE_BOARD } from '@/graphql/boards'
import { DeleteAndEditBoardButtonProps } from '@/types/board'

export function DeleteBoardButton({ boardId, boardName }: DeleteAndEditBoardButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(boardName)
  
  const [deleteBoard, { loading: deleteLoading }] = useMutation(DELETE_BOARD)
  const [updateBoard, { loading: updateLoading }] = useMutation(UPDATE_BOARD)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the board "${boardName}"? This will delete all columns and cards. This action cannot be undone.`)) {
      setIsOpen(false)
      return
    }

    try {
      await deleteBoard({
        variables: { id: boardId }
      })
      router.push('/boards')
    } catch (err) {
      console.error('Failed to delete board:', err)
      alert('Failed to delete board. Please try again.')
    }
  }

  const handleEdit = () => {
    setIsOpen(false)
    setNewName(boardName)
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    if (!newName.trim()) {
      alert('Board name is required')
      return
    }

    try {
      await updateBoard({
        variables: {
          id: boardId,
          name: newName.trim(),
        },
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update board:', err)
      alert('Failed to update board. Please try again.')
    }
  }

  const handleCancelEdit = () => {
    setNewName(boardName)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  return (
    <>
      <div className="relative">
        {/* Dropdown trigger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
            />
          </svg>
          Board Options
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown content */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                {/* Edit option */}
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <svg 
                    className="w-5 h-5" 
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
                  <div>
                    <div className="font-medium">Edit Board Name</div>
                    <div className="text-xs text-gray-500">
                      Rename this board
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Delete option */}
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-colors"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                  <div>
                    <div className="font-medium">
                      {deleteLoading ? 'Deleting...' : 'Delete Board'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Remove this board permanently
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelEdit}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">Edit Board Name</h3>

            {/* Name input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Board Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter board name..."
                autoFocus
              />
              <p className="mt-1 text-xs text-gray-500">
                Press Enter to save, Esc to cancel
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveEdit}
                disabled={updateLoading || !newName.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                {updateLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={updateLoading}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteBoardButton