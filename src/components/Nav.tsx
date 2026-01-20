'use client'
import { useState } from 'react'
import { useAuthenticationStatus, useSignOut, useNhostClient } from '@nhost/react'
import { useRouter } from 'next/navigation'
import { UserIcon, MenuIcon, InfoIcon, XIcon } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'

const BOARDS = gql`
  query Boards {
    boards(order_by: { position: desc }) {
      id
      name
    }
  }
`
const USERS = gql`
  query Users {
    users {
      id
      displayName
    }
  }
`
  

export default function Nav() {
  const router = useRouter()
  const { isAuthenticated } = useAuthenticationStatus()
  const { signOut } = useSignOut()
  const nhost = useNhostClient()
  const user = nhost.auth.getUser()

  // Fetch boards and users
  const { data: boardsData } = useQuery(BOARDS, { skip: !isAuthenticated })
  const { data: usersData } = useQuery(USERS, { skip: !isAuthenticated })

  const boards = boardsData?.boards || []
  const users = usersData?.users || []


  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kanbanBoard, setKanbanBoard] = useState('')
  const [assigneeColumn, setAssigneeColumn] = useState('')

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-blue-900 text-white fixed top-0 left-0 z-50 shadow-md font-sans">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Left: Hamburger + title */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="relative px-3 py-2 group"
              >
                <MenuIcon className="w-6 h-6" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
              </button>
            )}
            <span className="font-semibold text-lg">Cupcake Factory Kanban</span>
          </div>

          {/* Right: Profile + Sign Out */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-6 h-6" />
              <span className="font-medium">{isAuthenticated && user?.displayName ? user.displayName : 'Guest'}</span>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => signOut()}
                className="relative px-3 py-2 font-medium transition-colors group"
              >
                Sign Out
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-1/5 bg-blue-800/95 text-white shadow-lg z-40 p-6 flex flex-col gap-8">
          {/* Close button */}
          <button
            className="self-end mb-2"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Kanban Column */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1 font-medium">
              Change Kanban Board
              <button
                className="text-white hover:text-gray-300"
                onClick={() => alert('The Kanban workflow you are investigating')}
              >
                <InfoIcon className="w-4 h-4" />
              </button>
            </label>
            <select
            value={kanbanBoard}
            onChange={(e) => {
            const boardId = e.target.value
            if (boardId) router.push(`/boards/${boardId}`)
            setKanbanBoard(boardId)
             }}
             className="bg-blue-700 px-2 py-1 rounded text-white focus:outline-none"
             >
            <option value="">Select Column</option>
            {boards.map((board: { id: string; name: string }) => (
           <option key={board.id} value={board.id}>
            {board.name}
            </option>
              ))}
           </select>
          </div>

          {/* Assignee Column */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1 font-medium">
              Assignee Column
              <button
                className="text-white hover:text-gray-300"
                onClick={() => alert('The tasks delegated to this person on the kanban board')}
              >
                <InfoIcon className="w-4 h-4" />
              </button>
            </label>
            <select
              value={assigneeColumn}
              onChange={(e) => setAssigneeColumn(e.target.value)}
              className="bg-blue-700 px-2 py-1 rounded text-white focus:outline-none"
            >
              <option value="">Select Column</option>
              {users.map((u: { id: string, displayName: string }) => (
                <option key={u.id} value={u.displayName}>
                  {u.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  )
}