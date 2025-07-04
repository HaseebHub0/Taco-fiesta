"use client"

import { Button } from './ui/button'
import { Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '@/context/MusicContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackgroundMusic() {
  const { isPlaying, toggleMusic } = useMusic()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={toggleMusic}
          size="icon"
          variant="ghost"
          className="rounded-full bg-secondary/80 p-3 hover:bg-secondary/60 transition-all duration-300 hover:scale-110"
        >
          <motion.div
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.div>
        </Button>
      </motion.div>
    </AnimatePresence>
  )
} 