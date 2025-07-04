"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Command } from "cmdk"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Command className="relative rounded-lg border shadow-md">
      <div className="flex items-center border-b px-3">
        <Search className="w-4 h-4 text-gray-400" />
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="Search menu..."
          className="flex-1 px-2 py-3 outline-none"
        />
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto p-2">
        {/* Search results */}
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command>
  )
} 