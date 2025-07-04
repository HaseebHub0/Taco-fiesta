import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    
    await connectDB()

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response('User already exists', { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    return new Response(JSON.stringify({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }), { status: 201 })

  } catch (error) {
    return new Response('Error creating user', { status: 500 })
  }
} 