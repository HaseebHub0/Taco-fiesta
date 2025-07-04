import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    await connectDB()

    // Find admin user
    const user = await User.findOne({ email, isAdmin: true })
    if (!user) {
      return new Response('Invalid credentials', { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return new Response('Invalid credentials', { status: 401 })
    }

    // Create token
    const token = sign(
      { 
        id: user._id.toString(),
        email: user.email,
        isAdmin: user.isAdmin 
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return new Response(JSON.stringify({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }), { 
      status: 200,
      headers: {
        'Set-Cookie': `admin-token=${token}; Path=/; HttpOnly; SameSite=Strict`
      }
    })

  } catch (error) {
    return new Response('Server error', { status: 500 })
  }
} 