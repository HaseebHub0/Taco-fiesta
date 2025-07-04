"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative w-full overflow-hidden"
    >
      {children}
    </motion.div>
  )
} 