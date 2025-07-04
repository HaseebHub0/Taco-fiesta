"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-2xl"
          >
            <Star 
              className={star <= rating ? 'fill-yellow-400' : 'fill-gray-200'} 
            />
          </button>
        ))}
      </div>

      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        rows={4}
      />

      <Button className="w-full">Submit Review</Button>
    </div>
  )
} 