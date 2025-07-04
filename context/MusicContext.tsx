"use client"

import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/mexican-background.wav')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    
    // Save music state in localStorage
    const savedMusicState = localStorage.getItem('musicState')
    if (savedMusicState === 'playing') {
      audioRef.current.play()
      setIsPlaying(true)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        localStorage.setItem('musicState', 'paused')
      } else {
        audioRef.current.play()
        localStorage.setItem('musicState', 'playing')
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
} 