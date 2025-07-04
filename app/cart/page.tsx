"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()
  const [couponCode, setCouponCode] = useState("")

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">${item.price.toFixed(2)} each</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="text-yellow-600 hover:text-red-600"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-yellow-600 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Have a coupon code?
            </label>
            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code"
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">
              Proceed to Checkout
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}

