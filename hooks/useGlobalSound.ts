"use client"

import { useEffect } from 'react'

export function useGlobalSound() {
  useEffect(() => {
    const clickSound = new Audio('/sounds/click.wav')
    clickSound.volume = 0.2 // Lower volume for click sound

    const playSound = () => {
      const newSound = clickSound.cloneNode() as HTMLAudioElement
      newSound.play()
    }

    document.addEventListener('click', playSound)

    return () => {
      document.removeEventListener('click', playSound)
    }
  }, [])
} 