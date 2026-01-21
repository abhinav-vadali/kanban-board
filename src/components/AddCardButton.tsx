'use client'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

export const CREATE_CARD = gql`
  mutation CreateCard(
    $title: String!
    $description: String!
    $column_id: uuid!
    $position: float8!
  ) {
    insert_cards_one(
      object: {
        title: $title
        description: $description
        column_id: $column_id
        position: $position
      }
    ) {
      id
      title
      description
      position
      assignee
    }
  }
`

interface AddCardButtonProps {
  columnId: string
  currentCardsLength: number
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({
  columnId,
  currentCardsLength,
}) => {
  const [addingCard, setAddingCard] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [createCard, { loading, error }] = useMutation(CREATE_CARD)

  const handleAddCard = async () => {
    if (!title.trim()) return

    await createCard({
      variables: {
        title,
        description: description || '',
        column_id: columnId,
        position: currentCardsLength + 1,
      },
    })

    setTitle('')
    setDescription('')
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

      {error && (
        <p className="text-xs text-red-500">
          Failed to create card
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleAddCard}
          disabled={loading}
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
