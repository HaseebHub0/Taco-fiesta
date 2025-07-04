"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { ReviewForm } from "@/components/ReviewForm"

export default function ReviewsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <ReviewForm />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Overall Rating</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-4xl font-bold">4.8</div>
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(star => (
                <Star key={star} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Based on 128 reviews</p>
        </Card>
      </div>
    </div>
  )
} 