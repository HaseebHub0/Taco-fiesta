"use client"

import { useEffect } from 'react'

export function useGlobalClickSound() {
  useEffect(() => {
    const clickSound = new Audio('/sounds/click.wav')
    clickSound.volume = 0.4

    const playSound = () => {
      const newSound = clickSound.cloneNode() as HTMLAudioElement
      newSound.play()
    }

    // Play sound on all button and link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playSound()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
} 