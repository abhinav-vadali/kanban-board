'use client'
import { useAuthenticationStatus } from '@nhost/react'
import AuthPage from './auth/page'
import BoardPage from './boards/[boardId]/page'
import SelectBoardPage from './boards/page'
import { ClientOnly } from '../lib/ClientOnly'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) {
    return <ClientOnly> <p className="p-6">Checking authentication…</p> </ClientOnly>
  }

  // Show AuthPage if not signed in
  if (!isAuthenticated) {
    return <ClientOnly> <AuthPage/> </ClientOnly>
  }

  // Show BoardsPage if signed in
  return <ClientOnly> <SelectBoardPage /> </ClientOnly>
}
