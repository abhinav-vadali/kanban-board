'use client'
import { useMutation } from '@apollo/client'
import { DELETE_CARD } from '@/graphql/cards'
import { DeleteCardProps } from '@/types/card'

const DeleteCardButton: React.FC<DeleteCardProps> = ({id}) => {
  const [deleteCard, { loading }] = useMutation(DELETE_CARD)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click events
    
    if (!confirm('Are you sure you want to delete this card?')) return

    try {
      await deleteCard({
        variables: { id }
      })
    } catch (err) {
      console.error('Failed to delete card:', err)
    }
  }

  return (
    <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      {/* Delete button at top right */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {loading ? '...' : 'Delete'}
      </button>
    </div>
  )
}

export default DeleteCardButton