import { gql } from '@apollo/client'

export const CARDS_BY_BOARD = gql`
  query CardsByBoard($boardId: uuid!) {
    columns(
      where: { board_id: { _eq: $boardId } }
      order_by: { position: asc }
    ) {
      id
      name
      position
      cards(order_by: { position: asc }) {
        id
        title
        description
        position
      }
    }
  }
`
export const UPDATE_CARD_POSITION = gql`
  mutation UpdateCardPosition(
    $id: uuid!
    $column_id: uuid!
    $position: float8!
  ) {
    update_cards_by_pk(
      pk_columns: { id: $id }
      _set: { column_id: $column_id, position: $position }
    ) {
      id
    }
  }
`
