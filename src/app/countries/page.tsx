'use client'
import { gql, useQuery, ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'

const GET_COUNTRIES = gql`
  query GetCountries {
    countries { code name }
  }
`
export const externalClient = new ApolloClient({
  link: new HttpLink({uri: "https://countries.trevorblades.com/"}),
  cache: new InMemoryCache(),
});

function CountriesList() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
      <main className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Countries</h1>
      <ul className="list-disc pl-6">
        {data.countries.map((c: { code: string; name: string }) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default function CountriesPage() {
  return (
    <ApolloProvider client={externalClient}>
      <CountriesList />
    </ApolloProvider>
  )
}