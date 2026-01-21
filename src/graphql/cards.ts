import { gql } from '@apollo/client'

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

export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $column_id: uuid!, $position: float8!) {
    insert_cards_one(object: { title: $title, column_id: $column_id, position: $position }) {
      id
      title
      description
      position
      assignee
    }
  }
`
export const CARDS_BY_BOARD = gql`
subscription CardsByBoard($boardId: uuid!) {
  cards(
    where: { column: { board_id: { _eq: $boardId } } }
    order_by: { position: asc }
  ) {
    id
    title
    column_id
  }
}
`