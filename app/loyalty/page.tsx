"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function LoyaltyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Taco Fiesta Rewards</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Your Points</h2>
          <div className="text-4xl font-bold text-primary mb-4">250</div>
          <Progress value={25} className="mb-2" />
          <p className="text-sm text-gray-600">250 more points until your next free meal!</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Available Rewards</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-bold">Free Dessert</h3>
                <p className="text-sm text-gray-600">200 points</p>
              </div>
              <Button>Redeem</Button>
            </div>
            {/* Add more rewards */}
          </div>
        </Card>
      </div>
    </div>
  )
} 