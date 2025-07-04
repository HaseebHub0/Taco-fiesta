"use client"

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [guests, setGuests] = useState(2)

  const availableTimes = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "5:00 PM",
    "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Make a Reservation</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Select Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Select Time</h2>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((t) => (
                <Button
                  key={t}
                  variant={time === t ? 'default' : 'outline'}
                  onClick={() => setTime(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Number of Guests</h2>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setGuests(Math.max(1, guests - 1))}
                variant="outline"
              >
                -
              </Button>
              <span className="text-xl font-bold">{guests}</span>
              <Button 
                onClick={() => setGuests(Math.min(10, guests + 1))}
                variant="outline"
              >
                +
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 