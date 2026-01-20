'use client'

import { gql, useQuery } from '@apollo/client'
import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useSignUpEmailPassword,
} from '@nhost/react'
import { useState } from 'react'

const BOARDS = gql`
  query Boards {
    boards(order_by: { position: desc }) {
      id
      name
    }
  }
`

export default function BoardsPage() {
  /* ---------------- AUTH STATUS ---------------- */
  const { isAuthenticated, isLoading: authLoading } =
    useAuthenticationStatus()

  /* ---------------- AUTH HOOKS ---------------- */
  const {
    signInEmailPassword,
    isLoading: signingIn,
    error: signInError,
  } = useSignInEmailPassword()

  const {
    signUpEmailPassword,
    isLoading: signingUp,
    error: signUpError,
  } = useSignUpEmailPassword()

  /* ---------------- FORM STATE ---------------- */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')

  /* ---------------- DATA QUERY ---------------- */
  const { data, loading, error } = useQuery(BOARDS, {
    skip: !isAuthenticated,
  })

  /* ---------------- LOADING AUTH ---------------- */
  if (authLoading) {
    return <p className="p-6">Checking authentication…</p>
  }

  /* ---------------- SIGN IN / SIGN UP ---------------- */
  if (!isAuthenticated) {
    return (
      <div className="p-6 space-y-4 max-w-sm">
        <h1 className="text-xl font-semibold">
          {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />

        <button
          onClick={async () => {
            if (mode === 'signIn') {
              await signInEmailPassword(email, password)
            } else {
              await signUpEmailPassword(email, password)
            }
          }}
          disabled={signingIn || signingUp}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {mode === 'signIn'
            ? signingIn ? 'Signing in…' : 'Sign In'
            : signingUp ? 'Signing up…' : 'Sign Up'}
        </button>

        {mode === 'signIn' && signInError && (
          <p className="text-red-500">{signInError.message}</p>
        )}
        {mode === 'signUp' && signUpError && (
          <p className="text-red-500">{signUpError.message}</p>
        )}

        <p className="text-sm text-gray-600">
          {mode === 'signIn'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            className="underline"
            onClick={() =>
              setMode(mode === 'signIn' ? 'signUp' : 'signIn')
            }
          >
            {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    )
  }
  console.log('auth', isAuthenticated, authLoading)
  /* ---------------- BOARDS DATA ---------------- */
  if (loading) return <p className="p-6">Loading boards…</p>
  if (error)
    return <p className="p-6 text-red-500">{error.message}</p>

  if (!data || data.boards.length === 0) {
    return <p className="p-6 text-gray-600">Nothing in boards</p>
  } else return (
    <ul className="p-6 list-disc pl-6">
      {data.boards.map((b: { id: string; name: string }) => (
        <li key={b.id}>{b.name}</li>
      ))}
    </ul>
  )
}
