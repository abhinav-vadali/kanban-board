'use client'
import { useMutation } from '@apollo/client'
import { DELETE_COLUMN } from '@/graphql/columns'

interface DeleteColumnButtonProps {
  id: string
  columnName: string
}

export function DeleteColumnButton({ id, columnName }: DeleteColumnButtonProps) {
  const [deleteColumn, { loading }] = useMutation(DELETE_COLUMN)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!confirm(`Are you sure you want to delete the column "${columnName}"? All cards in this column will be deleted.`)) return

    try {
      await deleteColumn({
        variables: { id }
      })
    } catch (err) {
      console.error('Failed to delete column:', err)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
    >
      {loading ? '...' : 'Delete Column'}
    </button>
  )
}

export default DeleteColumnButton