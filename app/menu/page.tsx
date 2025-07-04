"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, HeartFilled, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/ScrollReveal"
import { toast } from "sonner"
import MenuCard from "@/components/MenuCard"
import { microAnimations } from "@/lib/microAnimations"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isSpecial?: boolean
  specialPrice?: number
  quantity?: number
}

const categories = [
  { id: "all", name: "All Items" },
  { id: "tacos", name: "Tacos" },
  { id: "burritos", name: "Burritos" },
  { id: "nachos", name: "Nachos" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" }
]

const menuItems = [
  // TACOS
  {
    id: "t1",
    name: "Carne Asada Tacos",
    description: "Grilled steak tacos with onions, cilantro, and lime",
    price: 12.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=2048",
    isSpecial: true,
    specialPrice: 9.99
  },
  {
    id: "t2",
    name: "Al Pastor Tacos",
    description: "Marinated pork with pineapple, onions, and cilantro",
    price: 11.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?q=80&w=2048"
  },
  {
    id: "t3",
    name: "Fish Tacos",
    description: "Battered fish with cabbage slaw and chipotle mayo",
    price: 13.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2048"
  },
  {
    id: "t4",
    name: "Pollo Asado Tacos",
    description: "Grilled chicken with avocado and pico de gallo",
    price: 10.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2048"
  },
  {
    id: "t5",
    name: "Shrimp Tacos",
    description: "Grilled shrimp with mango salsa and lime crema",
    price: 14.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=2048"
  },

  // BURRITOS
  {
    id: "b1",
    name: "Burrito Supreme",
    description: "Large flour tortilla filled with beans, rice, meat, and toppings",
    price: 14.99,
    category: "burritos",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2048",
    isSpecial: true,
    specialPrice: 11.99
  },
  {
    id: "b2",
    name: "Veggie Burrito",
    description: "Grilled vegetables, black beans, rice, and guacamole",
    price: 12.99,
    category: "burritos",
    image: "https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=2048"
  },
  {
    id: "b3",
    name: "Wet Burrito",
    description: "Smothered in red sauce and melted cheese",
    price: 15.99,
    category: "burritos",
    image: "https://images.unsplash.com/photo-1636509948247-0df891638583?q=80&w=2048"
  },
  {
    id: "b4",
    name: "California Burrito",
    description: "Carne asada, french fries, cheese, and pico de gallo",
    price: 13.99,
    category: "burritos",
    image: "https://images.unsplash.com/photo-1635222302796-43e1273f08c8?q=80&w=2048"
  },

  // NACHOS
  {
    id: "n1",
    name: "Supreme Nachos",
    description: "Loaded with meat, beans, cheese, guacamole, and sour cream",
    price: 16.99,
    category: "nachos",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2048",
    isSpecial: true,
    specialPrice: 13.99
  },
  {
    id: "n2",
    name: "BBQ Chicken Nachos",
    description: "Grilled chicken, BBQ sauce, cheese, and jalapeños",
    price: 15.99,
    category: "nachos",
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=2048"
  },
  {
    id: "n3",
    name: "Fajita Nachos",
    description: "Grilled peppers, onions, choice of meat, and cheese sauce",
    price: 17.99,
    category: "nachos",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2048"
  },

  // DRINKS
  {
    id: "d1",
    name: "Classic Margarita",
    description: "Tequila, lime juice, and triple sec",
    price: 8.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1631503190221-0f6a15367926?q=80&w=2048",
    isSpecial: true,
    specialPrice: 6.99
  },
  {
    id: "d2",
    name: "Horchata",
    description: "Traditional rice drink with cinnamon",
    price: 4.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=2048"
  },
  {
    id: "d3",
    name: "Mexican Coca-Cola",
    description: "Made with real cane sugar",
    price: 3.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=2048"
  },
  {
    id: "d4",
    name: "Jamaica",
    description: "Hibiscus iced tea",
    price: 4.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1560508180-03f285f67ded?q=80&w=2048"
  },

  // DESSERTS
  {
    id: "de1",
    name: "Churros",
    description: "Fried dough with cinnamon sugar and chocolate sauce",
    price: 7.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1624653111826-d17f8a5b48a3?q=80&w=2048",
    isSpecial: true,
    specialPrice: 5.99
  },
  {
    id: "de2",
    name: "Flan",
    description: "Classic Mexican caramel custard",
    price: 6.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1608849888016-35b12e0e9ee9?q=80&w=2048"
  },
  {
    id: "de3",
    name: "Sopapillas",
    description: "Fried pastry with honey and ice cream",
    price: 8.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1624374053855-9c5171e4ef70?q=80&w=2048"
  },
  {
    id: "de4",
    name: "Tres Leches Cake",
    description: "Three milk cake with whipped cream",
    price: 7.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1635341814827-36c8a3dee037?q=80&w=2048"
  }
]

export default function MenuPage() {
  const { data: session } = useSession()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.isSpecial ? (item.specialPrice || item.price) : item.price,
      quantity: item.quantity,
      image: item.image
    })
    toast.success(`Added ${item.quantity} ${item.name} to cart`)
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={microAnimations.fadeInUp}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 font-heading">Our Menu</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our authentic Mexican dishes, made with fresh ingredients and traditional recipes
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        variants={microAnimations.staggerChildren}
        initial="initial"
        animate="animate"
        className="mb-8 space-y-4"
      >
        <motion.div 
          variants={microAnimations.fadeInUp}
          className="relative max-w-md mx-auto"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search menu items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <motion.div 
          variants={microAnimations.fadeInUp}
          className="flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Menu Items Grid */}
      <motion.div
        variants={microAnimations.staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={microAnimations.fadeInUp}
            custom={index}
            transition={{ delay: index * 0.1 }}
          >
            <MenuCard
              item={item}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

