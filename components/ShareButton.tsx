"use client"

import { Share2, Facebook, Twitter, WhatsApp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ShareButton({ item }: { item: any }) {
  const shareUrl = `https://yoursite.com/menu/${item.id}`
  
  const shareHandlers = {
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`),
    twitter: () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`),
    whatsapp: () => window.open(`https://wa.me/?text=${shareUrl}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={shareHandlers.facebook}>
          <Facebook className="w-4 h-4 mr-2" /> Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareHandlers.twitter}>
          <Twitter className="w-4 h-4 mr-2" /> Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareHandlers.whatsapp}>
          <WhatsApp className="w-4 h-4 mr-2" /> WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 