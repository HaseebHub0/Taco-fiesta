"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: ''
  })

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || ''
      })
      fetchFavorites()
    }
  }, [session])

  const fetchFavorites = async () => {
    const res = await fetch('/api/user/favorites')
    const data = await res.json()
    setFavorites(data)
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
    if (res.ok) {
      setIsEditing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={profile.image || '/images/default-avatar.png'}
              alt={profile.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Favorites</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((item: any) => (
                <div key={item._id} className="flex gap-4 p-4 border rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorites yet</p>
          )}
        </div>
      </div>
    </div>
  )
} 