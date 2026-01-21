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
export const UPDATE_CARD = gql`
  mutation UpdateCard(
    $id: uuid!
    $title: String!
    $description: String
    $assignee: uuid
  ) {
    update_cards_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        description: $description
        assignee: $assignee
      }
    ) {
      id
      title
      description
      assignee
    }
  }
`

export const CREATE_CARD = gql`
  mutation CreateCard(
    $title: String!
    $description: String
    $assignee: uuid
    $column_id: uuid!
    $position: float8!
  ) {
    insert_cards_one(
      object: {
        title: $title
        description: $description
        assignee: $assignee
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

export const DELETE_CARD = gql`
  mutation DeleteCard($id: uuid!) {
    delete_cards_by_pk(id: $id) {
      id
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