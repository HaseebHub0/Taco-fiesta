"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  {
    title: "Private Party",
    description: "Book our venue for your private celebration",
    minGuests: 20,
    maxGuests: 100,
    pricePerPerson: 25
  },
  {
    title: "Corporate Event",
    description: "Perfect for team meetings and corporate gatherings",
    minGuests: 30,
    maxGuests: 150,
    pricePerPerson: 35
  },
  {
    title: "Wedding Reception",
    description: "Make your special day memorable with our catering",
    minGuests: 50,
    maxGuests: 200,
    pricePerPerson: 45
  }
]

export default function EventsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Event Bookings</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.title} className="p-6">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="space-y-2 mb-6">
              <p>Guests: {event.minGuests}-{event.maxGuests}</p>
              <p>Starting at ${event.pricePerPerson}/person</p>
            </div>
            <Button className="w-full">Book Now</Button>
          </Card>
        ))}
      </div>
    </div>
  )
} 