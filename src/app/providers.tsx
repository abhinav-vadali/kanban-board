'use client'

import { PropsWithChildren, useMemo, useState, useEffect } from 'react'
import { NhostProvider } from '@nhost/react'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
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
    return new ApolloClient({
      link: new HttpLink({
        uri: nhost.graphql.httpUrl,
        headers: userJwt
          ? {
              Authorization: `Bearer ${userJwt}`, // JWT tells Hasura which role/user
            }
          : {},
      }),
      cache: new InMemoryCache(),
    })
  }, [userJwt])

  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NhostProvider>
  )
}
