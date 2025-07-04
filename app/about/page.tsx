"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { Award, Utensils, Users, Leaf } from "lucide-react"

const chefTeam = [
  {
    name: "Chef Maria Rodriguez",
    role: "Head Chef",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2048",
    description: "With 20 years of experience in authentic Mexican cuisine"
  },
  {
    name: "Chef Carlos Mendoza",
    role: "Sous Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2048",
    description: "Specializes in traditional sauces and marinades"
  },
  {
    name: "Chef Ana Martinez",
    role: "Pastry Chef",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=2048",
    description: "Creates our delicious Mexican desserts"
  }
]

const awards = [
  {
    title: "Best Mexican Restaurant 2023",
    organization: "City Food Awards",
    image: "/images/awards/award1.png"
  },
  {
    title: "Customer Choice Award",
    organization: "FoodieGuide 2023",
    image: "/images/awards/award2.png"
  },
  {
    title: "5-Star Food Safety Rating",
    organization: "Health Department",
    image: "/images/awards/award3.png"
  }
]

const values = [
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Authentic Recipes",
    description: "Traditional Mexican recipes passed down through generations"
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Fresh Ingredients",
    description: "Locally sourced, high-quality ingredients for the best flavors"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family Atmosphere",
    description: "Creating a warm, welcoming environment for all our guests"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-16">
        <Image
          src="https://images.unsplash.com/photo-1615887087343-6a32f45f27a4?q=80&w=2048"
          alt="Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6 font-heading"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl"
            >
              Bringing authentic Mexican flavors to your table since 2010
            </motion.p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <ScrollReveal>
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-heading">Our Journey</h2>
            <p className="text-gray-600 mb-8">
              Taco Fiesta started as a small family-owned taco stand, inspired by our grandmother's 
              recipes. Today, we're proud to serve our community with the same passion and authenticity 
              that started our journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Image
                src="https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?q=80&w=2048"
                alt="Early Days"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="https://images.unsplash.com/photo-1621956838261-0b886ed0f11f?q=80&w=2048"
                alt="Present Day"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="bg-gray-50 py-16 mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-heading">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg"
                >
                  <div className="text-yellow-500 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Chef Team */}
      <ScrollReveal>
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">Meet Our Chefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefTeam.map((chef, index) => (
              <motion.div
                key={chef.name}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{chef.name}</h3>
                  <p className="text-yellow-500 font-medium mb-2">{chef.role}</p>
                  <p className="text-gray-600">{chef.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Awards */}
      <ScrollReveal>
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-heading">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="mb-4 flex justify-center">
                    <Award className="w-12 h-12 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p className="text-gray-400">{award.organization}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

