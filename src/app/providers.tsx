'use client'
import { PropsWithChildren } from 'react'
import { NhostProvider } from '@nhost/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { nhost } from '@/lib/nhost'

export default function Provider({ children }: PropsWithChildren) {
  const client = new ApolloClient({
    uri: nhost.graphql.url,
    cache: new InMemoryCache(),
  })

  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client = {client}>
        {children}
      </ApolloProvider>
    </NhostProvider>
  )
}