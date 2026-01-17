'use client'
import { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client'
import { makeClient } from './apollo-client'

export default function Providers({ children }: PropsWithChildren) {
  const client = makeClient()
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}