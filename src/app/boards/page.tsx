'use client'
import { useState } from 'react'
import { useSubscription, gql } from '@apollo/client'
import { useAuthenticationStatus } from '@nhost/react'
import { useRouter } from 'next/navigation'
import AuthPage from '../auth/page'

const BOARDS = gql`
  subscription Boards {
    boards(order_by: { position: desc }) {
      id
      name
    }
  }
`

export default function SelectBoardPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus()
  const { data, loading, error } = useSubscription(BOARDS, {
    skip: !isAuthenticated,
  })

  const [selectedBoard, setSelectedBoard] = useState('')

  // Loading / Auth checks
  if (authLoading) return <p className="p-6">Checking authentication…</p>
  if (!isAuthenticated) return <AuthPage />
  if (loading) return <p className="p-6">Loading your boards…</p>
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>

  const boards = data?.boards || []

  const handleGo = () => {
    if (!selectedBoard) return
    // Navigate to board page
    router.push(`/boards/${selectedBoard}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Cupcake Factory Kanban
        </h1>

        <p className="text-gray-600">
          Please select one of your boards from the dropdown below to get started.
          You can view, edit, and manage tasks in your selected board.
        </p>

        {/* Board selection */}
        <div className="flex flex-col space-y-4">
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a board</option>
            {boards.map((board: { id: string; name: string }) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleGo}
            disabled={!selectedBoard}
            className={`w-full py-2 rounded-xl font-semibold text-white transition ${
              selectedBoard ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Go to Board
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          If you don’t have a board yet, you can create one from your dashboard.
        </p>
      </div>
    </div>
  )
}
