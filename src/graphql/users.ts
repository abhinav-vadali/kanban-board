import { gql } from '@apollo/client'

export const GET_USERS = gql`
  subscription Users {
    users {
      id
      displayName
    }
  }
`

export const GET_USER = gql`
  subscription Users {
    users {
      id
      displayName
    }
  }
`