'use client'
import { useMutation, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { CREATE_CARD } from '../../graphql/cards'
import { GET_USERS } from '../../graphql/users'

interface AddCardButtonProps {
  columnId: string
  currentCardsLength: number
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({
  columnId,
  currentCardsLength,
}) => {
  const { data: usersData, loading: usersLoading } = useSubscription(GET_USERS)

  const [addingCard, setAddingCard] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')

  const [createCard, { loading: createLoading, error }] = useMutation(CREATE_CARD)

  const handleAddCard = async () => {
    if (!title.trim()) return

    await createCard({
      variables: {
        title,
        description: description || '',
        assignee: assignee || null,
        column_id: columnId,
        position: currentCardsLength + 1,
      },
    })

    setTitle('')
    setDescription('')
    setAssignee('')
    setAddingCard(false)
  }

  if (!addingCard) {
    return (
      <button
        onClick={() => setAddingCard(true)}
        className="mt-2 text-sm font-medium text-blue-600 hover:underline"
      >
        + Add card
      </button>
    )
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <input
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
      />

      <input
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
      />

      <select
        value={assignee || ""}
        onChange={(e) => setAssignee(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm w-full"
      >
        <option value="">Assigned to: (optional)</option>
        {usersLoading ? (
          <option disabled>Loading users...</option>
        ) : (
          usersData?.users?.map((user: { id: string; displayName: string }) => (
            <option key={user.id} value={user.id}>
              {user.displayName}
            </option>
          ))
        )}
      </select>

      {error && (
        <p className="text-xs text-red-500">
          Failed to create card
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleAddCard}
          disabled={createLoading}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={() => setAddingCard(false)}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}