"use client"

import { useRef } from 'react'

export function useSound(soundPath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(soundPath)
      audioRef.current.play()
    }
  }

  return play
} 