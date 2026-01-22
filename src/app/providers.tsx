'use client'
import { PropsWithChildren, useMemo, useState, useEffect } from 'react'
import { NhostProvider } from '@nhost/react'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client'
import { nhost } from '@/lib/nhost'

export default function Provider({ children }: PropsWithChildren) {
  const [userJwt, setUserJwt] = useState<string | null>(null)

  // Fetch JWT whenever component mounts or session changes
  useEffect(() => {
    const fetchJwt = async () => {
      const session = await nhost.auth.getSession() // get current session
      setUserJwt(session?.accessToken ?? null)
    }

    fetchJwt()

    // Optional: subscribe to auth state changes
    const unsubscribe = nhost.auth.onAuthStateChanged((_event, session) => {
      setUserJwt(session?.accessToken ?? null)
    })

    return () => unsubscribe()
  }, [])

  // Create Apollo client
  const client = useMemo(() => {
    
    const httpLink = new HttpLink({
      uri: nhost.graphql.httpUrl,
      headers: userJwt ? { Authorization: `Bearer ${userJwt}` } : {},
    })

    // Only create WS link on client
    const wsLink = new GraphQLWsLink(
          createClient({
            url: nhost.graphql.wsUrl,
            connectionParams: {
              headers: userJwt ? { Authorization: `Bearer ${userJwt}` } : {},
            },
          })
        )
    const link = wsLink
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query)
            return def.kind === 'OperationDefinition' && def.operation === 'subscription'
          },
          wsLink,
          httpLink
        )
      : httpLink

    return new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    })
  }, [userJwt])

  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NhostProvider>
  )
}
