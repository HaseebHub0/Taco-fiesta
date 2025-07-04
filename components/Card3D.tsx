"use client"

import { useState, useRef, MouseEvent } from 'react'
import { motion } from 'framer-motion'

export function Card3D({ children }: { children: React.ReactNode }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * 10
    const rotateYValue = ((centerX - x) / centerX) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="relative bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="relative z-10 p-6"
        style={{ transform: "translateZ(50px)" }}
      >
        {children}
      </motion.div>
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-red-500/20 to-purple-600/20" />
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 60%)",
        }}
      />
    </motion.div>
  )
} 