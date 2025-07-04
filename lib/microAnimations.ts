import { Variants } from "framer-motion"

export const microAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  
  popIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300 }
  },
  
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
  },

  buttonTap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400 }
  },

  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400 }
  },

  staggerChildren: {
    animate: { transition: { staggerChildren: 0.1 } }
  }
} as const

export const listAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const itemAnimation: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
} 