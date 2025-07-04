"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-yellow-500 rounded-full border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
} 