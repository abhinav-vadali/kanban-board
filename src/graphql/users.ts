import { gql } from '@apollo/client'

export const USERS = gql`
  query Users {
    users {
      id
      displayName
    }
  }
`
export const GET_USER = gql`
  query GetUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      displayName
    }
  }
`