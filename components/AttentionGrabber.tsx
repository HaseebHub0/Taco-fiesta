"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { floatingAnimation } from "@/lib/animations"

export function AttentionGrabber() {
  return (
    <motion.div
      variants={floatingAnimation}
      animate="animate"
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <ArrowDown className="w-8 h-8 text-yellow-500" />
    </motion.div>
  )
} 