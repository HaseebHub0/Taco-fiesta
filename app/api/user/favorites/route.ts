import { getServerSession } from 'next-auth/next'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  const session = await getServerSession()
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectDB()
  const user = await User.findOne({ email: session.user.email }).populate('favorites')
  return new Response(JSON.stringify(user.favorites), { status: 200 })
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { itemId } = await req.json()
  await connectDB()
  
  const user = await User.findOne({ email: session.user.email })
  if (!user.favorites.includes(itemId)) {
    user.favorites.push(itemId)
    await user.save()
  }
  
  return new Response('Added to favorites', { status: 200 })
} 