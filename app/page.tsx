"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundMusic from '@/components/BackgroundMusic'
import { useSound } from '@/hooks/useSound'
import { FadeInUp, FadeIn, ScaleIn } from '@/components/ScrollAnimations'
import { useInView } from "react-intersection-observer"
import { ScrollReveal } from "@/components/ScrollReveal"
import { ChefHat, Clock, Star, Truck, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageWithFallback from "@/components/ImageWithFallback"
import { microAnimations } from "@/lib/microAnimations"

// Add proper TypeScript interface
interface Deal {
  id: number
  title: string
  description: string
  image: string
  price: string
}

interface Specialty {
  title: string
  image: string
  description: string
}

const deals: Deal[] = [
  {
    id: 1,
    title: "Taco Tuesday",
    description: "2 for 1 on all tacos!",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80",
  },
  {
    id: 2,
    title: "Thirsty Thursday",
    description: "50% off all drinks",
    image: "/images/deals/drinks.jpg",
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "Free dessert with any main course",
    image: "/images/deals/dessert.jpg",
  },
]

const specialties: Specialty[] = [
  {
    title: "Authentic Tacos",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80",
    description:
      "Savor the taste of our authentic Mexican tacos, made with fresh ingredients and traditional recipes passed down through generations.",
  },
  {
    title: "Cheesy Quesadillas",
    image: "https://images.unsplash.com/photo-1628824665827-1bb7875e1c44?q=80",
    description:
      "Indulge in our perfectly grilled quesadillas, filled with melted cheese and your choice of savory meats or vegetables.",
  },
  {
    title: "Refreshing Margaritas",
    image: "https://images.unsplash.com/photo-1631503190221-0f6a15367926?q=80",
    description:
      "Cool off with our signature margaritas, crafted with premium tequila and fresh lime juice for the perfect balance of sweet and tangy.",
  },
]

const specialOffers: Deal[] = [
  {
    title: "Taco Tuesday Special",
    description: "Get 3 tacos for the price of 2 every Tuesday!",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1920&fit=crop",
    price: "15.99"
  },
  {
    title: "Family Fiesta Pack",
    description: "Perfect for 4-6 people with a variety of Mexican favorites",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1920&fit=crop",
    price: "49.99"
  },
  {
    title: "Weekend Brunch Special",
    description: "Unlimited Mexican brunch with live music",
    image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=1920&fit=crop",
    price: "24.99"
  }
]

export default function Home() {
  const [imageError, setImageError] = useState<boolean>(false)
  const [currentDeal, setCurrentDeal] = useState<number>(0)
  const playClick = useSound('/sounds/click.wav')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const features = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Expert Chefs",
      description: "Authentic Mexican cuisine crafted by experienced chefs"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Service",
      description: "Fast preparation without compromising quality"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Top Rated",
      description: "5-star rated Mexican restaurant in the city"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Hot and fresh delivery to your doorstep"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: "The authentic flavors remind me of my grandmother's cooking. Best Mexican food in town!",
      rating: 5
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      text: "Their tacos al pastor are incredible! Great atmosphere and friendly staff.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      text: "Fresh ingredients, authentic recipes, and amazing service. My new favorite spot!",
      rating: 5
    }
  ]

  const bestSellers = [
    {
      name: "Carne Asada Tacos",
      image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b",
      price: 12.99,
      description: "Premium grilled steak with fresh cilantro, onions, and homemade salsa"
    },
    {
      name: "Enchiladas Verdes",
      image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615",
      price: 14.99,
      description: "Four corn tortillas filled with chicken, topped with green salsa and cream"
    },
    {
      name: "Guacamole Supreme",
      image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c",
      price: 9.99,
      description: "Fresh avocados mixed with tomatoes, onions, and secret spices"
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Choose Your Meal",
      description: "Browse our extensive menu of authentic Mexican dishes",
      icon: "🌮"
    },
    {
      step: 2,
      title: "Place Your Order",
      description: "Select your favorites and customize to your taste",
      icon: "📝"
    },
    {
      step: 3,
      title: "Enjoy!",
      description: "Pick up your order or get it delivered to your door",
      icon: "🚀"
    }
  ]

  const heroImages = [
    "/images/home/hero-1.jpg",  // make sure this exists in public/images folder
    "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=2048",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2048",
    "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2048",
    "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=2048"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDeal((prevDeal) => (prevDeal + 1) % deals.length)
    }, 5000)

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(imageTimer)
    }
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true)
    const target = e.target as HTMLImageElement
    target.src = 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80' // Generic Mexican food fallback
  }

  return (
    <div className="min-h-screen">
      <BackgroundMusic />
      <section className="relative h-[90vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <ImageWithFallback
                src="/images/hero.jpg"
                alt="Taco Fiesta Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-6xl font-bold mb-6 font-heading shadow-text">
                Experience Authentic Mexican Flavors
              </h1>
              <p className="text-xl mb-8 shadow-text">
                Discover the taste of traditional Mexican cuisine with our handcrafted dishes
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild className="shadow-lg">
                  <Link href="/menu">View Menu</Link>
                </Button>
                <Button size="lg" variant="ghost" asChild className="shadow-lg">
                  <Link href="#location">Find Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all transform hover:scale-125 ${
                index === currentImageIndex 
                  ? 'bg-yellow-500 w-6' 
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ 
                    y: -5,
                    borderColor: "rgba(234, 179, 8, 0.5)"
                  }}
                  className="p-6 rounded-xl bg-white/80 backdrop-blur-sm
                    border-2 border-yellow-500/20 shadow-lg
                    transition-all duration-300"
                >
                  <div className="text-yellow-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">Today's Specials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialOffers.map((offer, index) => (
                <FadeInUp key={offer.title} delay={index * 0.2}>
                  <Card className="group">
                    <div className="relative h-64">
                      <ImageWithFallback
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {offer.title}
                        </h3>
                        <p className="text-white/90">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-yellow-500">
                          ${offer.price}
                        </span>
                        <Button 
                          className="bg-yellow-500 hover:bg-red-500 text-white"
                          asChild
                        >
                          <Link href="/menu">Order Now</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">Follow Us on Instagram</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Add Instagram-like images here */}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-yellow-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-8 font-heading">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg"
                />
                <Button variant="default" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">
              Our Bestsellers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bestSellers.map((dish) => (
                <motion.div
                  key={dish.name}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">${dish.price}</span>
                      <Button onClick={playClick} asChild>
                        <Link href="/menu">Order Now</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <motion.div
                  key={step.step}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <div className="flex text-yellow-500">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="location" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">
              Find Us Here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Visit Our Restaurant</h3>
                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 mt-1 mr-2" />
                  <p className="text-gray-600">
                    123 Taco Street, Mexican District,<br />
                    Food City, FC 12345
                  </p>
                </div>
                <Button onClick={playClick}>
                  Get Directions <ArrowRight className="ml-2" />
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {/* Add your map component or image here */}
                <Image
                  src="/images/map.jpg"
                  alt="Restaurant Location"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

