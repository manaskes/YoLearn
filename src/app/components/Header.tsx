import { Menu, Moon, Bell, Settings, User } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  toggleLeftSidebar: () => void
}

export default function Header({ toggleLeftSidebar }: HeaderProps) {

  return (
    <header className="bg-white shadow-sm border-b w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo + toggle for mobile */}
        <div className="flex items-center space-x-4">
          {/* Mobile sidebar toggle */}
          <button
            onClick={toggleLeftSidebar}
            className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo + subtitle */}
          <div>
            <Image
              src="/logo.png" 
              alt="YoLearn.ai Logo"
              width={120}
              height={120}
              className="rounded-md object-contain"
            />
            <p className="text-sm text-gray-400">Your AI Learning Companion</p>
          </div>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center space-x-3">
          {[Moon, Bell, Settings, User].map((Icon, idx) => (
            <button
              key={idx}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Icon className="h-5 w-5 text-gray-700" />
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
