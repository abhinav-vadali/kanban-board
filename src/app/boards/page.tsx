'use client'
import { gql, useQuery } from '@apollo/client'
import { useAuthenticationStatus } from '@nhost/react'

const BOARDS = gql`
  query Boards { boards(order_by: {created_at: desc}) { id name } }
`

export default function BoardsPage() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { data, loading, error } = useQuery(BOARDS, { skip: !isAuthenticated })

  if (!isAuthenticated) return <p>Please sign in</p>
  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul className="p-6 list-disc pl-6">
        {data.boards.map((b: { id: string; name: string }) => (
        <li key={b.id}>{b.name}</li>
      ))}
    </ul>
  )
}