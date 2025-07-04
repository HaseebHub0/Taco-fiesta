"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OrderPage() {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery')
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Type Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">How would you like to receive your order?</h2>
          <div className="flex gap-4">
            <Button 
              variant={orderType === 'delivery' ? 'default' : 'outline'}
              onClick={() => setOrderType('delivery')}
            >
              Delivery
            </Button>
            <Button 
              variant={orderType === 'pickup' ? 'default' : 'outline'}
              onClick={() => setOrderType('pickup')}
            >
              Pickup
            </Button>
          </div>
        </Card>

        {/* Delivery/Pickup Details */}
        {orderType === 'delivery' ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            {/* Add address form */}
          </Card>
        ) : (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Pickup Location</h2>
            {/* Add store locations */}
          </Card>
        )}
      </div>
    </div>
  )
} 