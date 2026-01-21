import { gql } from '@apollo/client'

export const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!) {
    insert_boards_one(object: { name: $name }) {
      id
      name
    }
  }
`

export const BOARD_WITH_COLUMNS = gql` 
  subscription BoardWithColumns($id: uuid!) {
    boards_by_pk(id: $id) {
      id
      name
      columns(order_by: { position: asc }) {
        id
        name
        position
        cards(order_by: { position: asc }) {
         id
         title
         description
         column_id
        position
          assignee
      }
    }
    }
  }
`
export const BOARDS = gql`
  subscription Boards {
    boards(order_by: { position: asc }) {
      id
      name
    }
  }
`

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: uuid!) {
    # First delete all cards in all columns of the board
    delete_cards(where: { column: { board_id: { _eq: $id } } }) {
      affected_rows
    }
    # Then delete all columns in the board
    delete_columns(where: { board_id: { _eq: $id } }) {
      affected_rows
    }
    # Finally delete the board
    delete_boards_by_pk(id: $id) {
      id
    }
  }
`

export const UPDATE_BOARD = gql`
  mutation UpdateBoard(
    $id: uuid!
    $name: String!
  ) {
    update_boards_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name }
    ) {
      id
      name
    }
  }
`