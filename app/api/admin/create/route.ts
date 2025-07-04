import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    // Create admin credentials
    const adminUser = {
      name: "Admin User",
      email: "admin@tacofiesta.com",
      password: "Admin@123",
      isAdmin: true
    }
    
    await connectDB()

    // Check if admin exists
    const existingUser = await User.findOne({ email: adminUser.email })
    if (existingUser) {
      return new Response('Admin already exists', { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminUser.password, 12)

    // Create admin user
    const user = await User.create({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      isAdmin: true
    })

    return new Response(JSON.stringify({
      message: 'Admin created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }), { status: 201 })

  } catch (error) {
    return new Response('Error creating admin', { status: 500 })
  }
} 