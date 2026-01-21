'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { PlusIcon } from 'lucide-react'
import { CREATE_BOARD, BOARDS } from '../../graphql/boards'

export const AddBoardButton: React.FC<{ onBoardAdded?: () => void , refetchBoards?: () => void }> = ({ onBoardAdded }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [createBoard,] = useMutation(CREATE_BOARD, {
    refetchQueries: [BOARDS],
  })

  const handleAddBoard = async () => {
    if (!boardName.trim()) return
    try {
      await createBoard({ variables: { name: boardName.trim() } })
      setBoardName('')
      setIsAdding(false)
      onBoardAdded?.()
    } catch (err) {
      console.error('Error creating board:', err)
    }
  }

  return (
    <div className="mt-4">
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl shadow-md w-full justify-center"
        >
          <PlusIcon className="w-4 h-4" />
          Add Board
        </button>
      ) : (
        <div className="flex flex-col gap-2">
  <input
    type="text"
    placeholder="New board name"
    value={boardName}
    onChange={(e) => setBoardName(e.target.value)}
    className="px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Save & Cancel buttons under input */}
  <div className="flex gap-2 mt-2">
    <button
      onClick={handleAddBoard}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Save
    </button>
    <button
      onClick={() => {setIsAdding(false);setBoardName('')}}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
    >
      Cancel
    </button>
  </div>
</div>

      )}
    </div>
  )
}
