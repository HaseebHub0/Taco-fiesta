"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  BarChart, 
  MessageSquare,
  Menu,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { signOut } from 'next-auth/react'

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    title: "Menu Management",
    href: "/admin/menu",
    icon: <Utensils className="w-5 h-5" />
  },
  {
    title: "Deals & Discounts",
    href: "/admin/deals",
    icon: <Tag className="w-5 h-5" />
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart className="w-5 h-5" />
  },
  {
    title: "Feedback",
    href: "/admin/feedback",
    icon: <MessageSquare className="w-5 h-5" />
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && !session.user.isAdmin) {
      router.push("/")
      toast.error("Access denied: Admin only")
    }
  }, [status, session, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">Admin Dashboard</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform
        md:translate-x-0 bg-white border-r w-64
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Taco Fiesta Admin</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        transition-all duration-300 ease-in-out
        md:ml-64 min-h-screen bg-gray-100
      `}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 