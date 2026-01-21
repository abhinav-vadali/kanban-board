import { gql } from '@apollo/client'

export const CREATE_COLUMN = gql`
  mutation CreateColumn(
    $name: String!
    $board_id: uuid!
    $position: float8!
  ) {
    insert_columns_one(
      object: {
        name: $name
        board_id: $board_id
        position: $position
      }
    ) {
      name
      board_id
      position
    }
  }
`

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($id: uuid!) {
    # First delete all cards in the column
    delete_cards(where: { column_id: { _eq: $id } }) {
      affected_rows
    }
    # Then delete the column
    delete_columns_by_pk(id: $id) {
      id
    }
  }
`

export const UPDATE_COLUMN = gql`
  mutation UpdateColumn(
    $id: uuid!
    $name: String!
  ) {
    update_columns_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name }
    ) {
      id
      name
    }
  }
`
