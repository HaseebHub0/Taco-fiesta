"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const orderStages = [
  { id: 1, title: "Order Received", time: "12:30 PM" },
  { id: 2, title: "Preparing", time: "12:35 PM" },
  { id: 3, title: "Ready for Pickup", time: "12:50 PM" },
  { id: 4, title: "Completed", time: "" }
]

export default function TrackOrderPage() {
  const [currentStage, setCurrentStage] = useState(2)
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Order #12345</h2>
          <Progress value={(currentStage / orderStages.length) * 100} />
        </div>

        <div className="space-y-4">
          {orderStages.map((stage) => (
            <div 
              key={stage.id}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                stage.id <= currentStage ? 'bg-yellow-50' : 'bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stage.id <= currentStage ? 'bg-yellow-500 text-white' : 'bg-gray-200'
              }`}>
                {stage.id}
              </div>
              <div>
                <h3 className="font-bold">{stage.title}</h3>
                {stage.time && <p className="text-sm text-gray-600">{stage.time}</p>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 