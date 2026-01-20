'use client'
import { gql, useQuery } from '@apollo/client'
import { useAuthenticationStatus } from '@nhost/react'
import { useParams } from 'next/navigation'
import AuthPage from '../../auth/page'
import Board from '@/components/Board'

const BOARD_WITH_COLUMNS = gql`
  query BoardWithColumns($id: uuid!) {
    boards_by_pk(id: $id) {
      id
      name
      columns(order_by: { position: asc }) {
        id
        name
        position
        cards(order_by: { position: asc }) {
          id
          title
          description
          position
          assignee
        }
      }
    }
  }
`

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>()
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus()

  const { data, loading, error } = useQuery(BOARD_WITH_COLUMNS, {
    variables: { id: boardId },
    skip: !isAuthenticated || !boardId,
  })

  if (authLoading) return <p className="p-6">Checking authentication…</p>
  if (!isAuthenticated) return <AuthPage />
  if (loading) return <p className="p-6">Loading board…</p>
  if (error) return <p className="p-6 text-red-500">{error.message}</p>
  if (!data?.boards_by_pk) return <p className="p-6">Board not found.</p>

  const board = data.boards_by_pk

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
