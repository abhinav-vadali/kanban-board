'use client'
import { useSubscription } from '@apollo/client'
import { useAuthenticationStatus } from '@nhost/react'
import { useParams } from 'next/navigation'
import AuthPage from '../../auth/page'
import Board from '@/components/BoardComponents/Board'
import { BOARD_WITH_COLUMNS } from '@/graphql/boards'

export default function BoardPage() {
  const { boardId }= useParams<{ boardId: string }>()
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus()

  const { data: boardData, loading: boardLoading, error: boardError } = useSubscription(BOARD_WITH_COLUMNS, {
    variables: { id: boardId ?? '' },
    skip: !isAuthenticated || !boardId,
  })
  console.log('Board data updated:', boardData)

  if (authLoading) return <p className="p-6">Checking authentication…</p>
  if (!isAuthenticated) return <AuthPage />
  if (boardLoading) return <p className="p-6">Loading board…</p>
  if (boardError) return <p className="p-6 text-red-500">{boardError.message}</p>
  if (!boardData?.boards_by_pk) return <p className="p-6">Board not found.</p>

  const board = boardData.boards_by_pk

  return (
    <div className="p-6">
      <Board
        id={board.id}
        name={board.name}
        color = "#EFD7D4"
        boardColumns = {board.columns}
      />
    </div>
  )
}
