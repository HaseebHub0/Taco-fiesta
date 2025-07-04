"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Utensils } from 'lucide-react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      const isPointerCursor = window.getComputedStyle(target).cursor === 'pointer'
      const isButton = target.tagName === 'BUTTON' || target.closest('button') !== null
      const isLink = target.tagName === 'A' || target.closest('a') !== null
      setIsPointer(isPointerCursor || isButton || isLink)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Fork Icon */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          rotate: isClicking ? 45 : 0,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.9 : 1
          }}
          className="text-yellow-500 drop-shadow-lg"
        >
          <Utensils 
            size={24} 
            className={`transform transition-colors duration-300 ${
              isPointer ? 'text-red-500' : 'text-yellow-500'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-40"
        style={{
          border: '2px solid',
          borderColor: isPointer ? '#ef4444' : '#eab308',
          backdropFilter: 'blur(4px)'
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />

      {/* Trailing effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-30 flex gap-1"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-yellow-500/30 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isPointer ? [0.5, 1, 0.5] : 1,
              opacity: isPointer ? [0.3, 0.6, 0.3] : 0.3
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>
    </>
  )
} 