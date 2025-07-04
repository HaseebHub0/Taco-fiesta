"use client"

import { motion } from "framer-motion"
import { Card } from "./card"
import { microAnimations } from "@/lib/microAnimations"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        initial: microAnimations.fadeInUp.initial,
        animate: {
          ...microAnimations.fadeInUp.animate,
          transition: { delay, duration: 0.5 }
        }
      }}
    >
      <Card 
        className={cn(
          "transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          className
        )}
      >
        {children}
      </Card>
    </motion.div>
  )
} 