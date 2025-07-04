import { getServerSession } from 'next-auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 })
    }

    await connectDB()
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    return new Response(JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }), { status: 200 })

  } catch (error) {
    return new Response('Error fetching user', { status: 500 })
  }
} 