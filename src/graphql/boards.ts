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

const BOARDS_SUBSCRIPTION = gql`
  subscription Boards {
    boards(order_by: { position: asc }) {
      id
      name
    }
  }
`