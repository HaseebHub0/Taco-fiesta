"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface NutritionalData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export function NutritionalInfo({ data }: { data: NutritionalData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nutritional Information</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Calories</div>
            <div className="text-xl font-bold">{data.calories}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Protein</div>
            <div className="text-xl font-bold">{data.protein}g</div>
          </div>
          {/* Add more nutritional info */}
        </div>
      </DialogContent>
    </Dialog>
  )
} 