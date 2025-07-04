"use client"

import { motion } from "framer-motion"
import { kineticTypography } from "@/lib/animations"

export function KineticText({ text }: { text: string }) {
  return (
    <motion.div
      variants={kineticTypography}
      initial="initial"
      animate="animate"
      className="flex overflow-hidden"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={kineticTypography}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
} 