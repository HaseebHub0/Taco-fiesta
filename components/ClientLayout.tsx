"use client"

import { useGlobalClickSound } from '@/hooks/useGlobalClickSound'

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  useGlobalClickSound()
  
  return <>{children}</>
} 