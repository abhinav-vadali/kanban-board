'use client'
import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useSignUpEmailPassword,
} from '@nhost/react'
import { useState } from 'react'


export default function AuthPage() {
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
  const [displayName, setDisplayName] = useState('')
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')


  /* ---------------- LOADING AUTH ---------------- */
  if (authLoading) {
    return <p className="p-6">Checking authentication…</p>
  }

/* ---------------- SIGN IN / SIGN UP ---------------- */
if (!isAuthenticated) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
        </h1>

        <div className="space-y-4">
          {/* Name input only for sign-up */}
          {mode === 'signUp' && (
            <input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={async () => {
            if (signingIn || signingUp) return // ignore extra clicks
            if (mode === 'signIn') {
              await signInEmailPassword(email, password)
            } else {
              await signUpEmailPassword(email, password, { displayName })
            }
          }}
          disabled={signingIn || signingUp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl px-6 py-3 transition"
        >
          {mode === 'signIn'
            ? signingIn ? 'Signing in…' : 'Sign In'
            : signingUp ? 'Signing up…' : 'Sign Up'}
        </button>

        {(signInError && mode === 'signIn') && (
          <p className="text-red-500">{signInError.message}</p>
        )}
        {(signUpError && mode === 'signUp') && (
          <p className="text-red-500">{signUpError.message}</p>
        )}

        <p className="text-gray-600 text-sm">
          {mode === 'signIn'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            className="underline font-medium"
            onClick={() =>
              setMode(mode === 'signIn' ? 'signUp' : 'signIn')
            }
          >
            {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}

  console.log('auth', isAuthenticated, authLoading)
}