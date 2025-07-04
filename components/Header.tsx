"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { microAnimations } from "@/lib/microAnimations"

export default function Header() {
  const pathname = usePathname()
  const { items = [] } = useCart()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-3xl font-bold font-heading"
          >
            <Link href="/" className="text-yellow-500 hover:text-red-500 transition-colors">
              Taco Fiesta
            </Link>
          </motion.div>

          <motion.div 
            variants={microAnimations.staggerChildren}
            initial="initial"
            animate="animate"
            className="flex items-center gap-4"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                variants={microAnimations.slideIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                  className="relative overflow-hidden group"
                >
                  <Link href={item.href}>
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-yellow-500 z-0"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={pathname === '/cart' ? "default" : "ghost"}
                asChild
                className="relative"
              >
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {items?.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-sm flex items-center justify-center"
                    >
                      {items.length}
                    </motion.span>
                  )}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}

