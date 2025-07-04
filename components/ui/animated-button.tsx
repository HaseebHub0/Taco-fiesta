"use client"

import { motion } from "framer-motion"
import { Button } from "./button"
import { microAnimations } from "@/lib/microAnimations"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={microAnimations.hover}
      whileTap={microAnimations.buttonTap}
    >
      <Button 
        className={cn("relative overflow-hidden group", className)} 
        {...props}
      >
        <motion.span
          initial={{ y: 0 }}
          whileHover={{ y: -30 }}
          transition={{ duration: 0.3 }}
          className="block"
        >
          {children}
        </motion.span>
        <motion.span
          initial={{ y: 30 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  )
} 