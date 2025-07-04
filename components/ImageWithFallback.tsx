"use client"

import { useState } from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  priority?: boolean
  [key: string]: any
}

const defaultFallbackImage = "/images/fallback.jpg" // Local fallback image
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = defaultFallbackImage,
  className,
  priority = false,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-all duration-300",
          isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0",
          error ? "grayscale" : "",
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        priority={priority}
        quality={90}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="text-center p-4">
            <p className="text-sm text-gray-500">Failed to load image</p>
            <button 
              onClick={() => {
                setError(false)
                setImgSrc(src)
              }}
              className="text-sm text-yellow-500 hover:text-red-500 mt-2"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 