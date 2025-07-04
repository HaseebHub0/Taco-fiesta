"use client"

import { motion } from 'framer-motion'

const pathVariants = {
  circle: "M 50,50 m -50,0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0",
  square: "M 0,0 L 100,0 L 100,100 L 0,100 Z",
  triangle: "M 50,0 L 100,100 L 0,100 Z",
  star: "M 50,0 L 61,35 L 98,35 L 68,57 L 79,91 L 50,70 L 21,91 L 32,57 L 2,35 L 39,35 Z"
}

export function MorphingShape() {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="text-yellow-500 fill-current"
    >
      <motion.path
        animate={{
          d: [
            pathVariants.circle,
            pathVariants.square,
            pathVariants.triangle,
            pathVariants.star,
            pathVariants.circle
          ]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.svg>
  )
} 