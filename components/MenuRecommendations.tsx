"use client"

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import MenuItem from "@/components/MenuItem"

export function MenuRecommendations() {
  const [preferences, setPreferences] = useState([
    "spicy", "vegetarian", "popular"
  ])

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {preferences.map(pref => (
          <button
            key={pref}
            className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800
              hover:bg-yellow-200 capitalize"
          >
            {pref}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recommended items based on preferences */}
      </div>
    </div>
  )
} 