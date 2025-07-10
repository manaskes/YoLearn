import Link from 'next/link'
import {
  BookOpen, User, GraduationCap, ClipboardList,
  RefreshCw, BrainCircuit, Rocket, Notebook,
  Twitter, Instagram, Youtube, Facebook, X,
  LucideIcon
} from 'lucide-react'
import Image from 'next/image'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

type NavItem = {
  name: string
  icon: LucideIcon
}

type SocialItem = {
  icon: LucideIcon
  color: string
}

export default function LeftSidebar({ isOpen, onClose }: SidebarProps) {
  const activeTab = 'Learn'

  const learningItems: NavItem[] = [
    { name: 'Plan', icon: BookOpen },
    { name: 'Learn', icon: GraduationCap },
    { name: 'Practice', icon: ClipboardList },
    { name: 'Revise', icon: RefreshCw },
    { name: 'Reflect', icon: BrainCircuit },
    { name: 'Grow', icon: Rocket }
  ]

  const shortcutItems: NavItem[] = [
    { name: 'My Notebook', icon: Notebook },
    { name: 'My Account', icon: User }
  ]

  const socialIcons: SocialItem[] = [
    { icon: Twitter, color: 'text-black' },
    { icon: Youtube, color: 'text-black' },
    { icon: Instagram, color: 'text-black' },
    { icon: Facebook, color: 'text-black' }
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 overflow-y-auto inset-y-0">
        <SidebarContent
          activeTab={activeTab}
          learningItems={learningItems}
          shortcutItems={shortcutItems}
          socialIcons={socialIcons}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

          <aside className="relative w-64 bg-white h-full shadow-lg z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <Image
                    src="/logo.png"
                    alt="YoLearn.ai Logo"
                    width={110}
                    height={110}
                    className="rounded-md object-contain"
                  />
                  <p className="text-xs mt-2 text-gray-400 leading-tight">Your AI Learning Companion</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <SidebarContent
                activeTab={activeTab}
                learningItems={learningItems}
                shortcutItems={shortcutItems}
                socialIcons={socialIcons}
              />
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

function SidebarContent({
  activeTab,
  learningItems,
  shortcutItems,
  socialIcons
}: {
  activeTab: string
  learningItems: NavItem[]
  shortcutItems: NavItem[]
  socialIcons: SocialItem[]
}) {
  return (
    <div className="p-3 space-y-6 text-sm text-black">
      {/* Learning Zone */}
      <div>
        <h2 className="font-semibold mb-4">Learning Zone</h2>
        <ul className="space-y-2">
          {learningItems.map((item) => {
            const isActive = item.name === activeTab
            return (
              <li key={item.name}>
                <Link
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-xl space-x-3 font-medium ${isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-black hover:bg-gray-100'
                    }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-black'}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="font-semibold mb-4">Shortcuts</h2>
        <ul className="space-y-2">
          {shortcutItems.map((item) => (
            <li key={item.name}>
              <Link
                href="#"
                className="flex items-center px-3 py-2 rounded-xl space-x-3 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5 text-black" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className='pb-2'>
        <h2 className="font-semibold mb-4">Connect</h2>
        <div className="flex space-x-3 mb-5">
          {socialIcons.map((SocialIcon, index) => (
            <button
              key={index}
              className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 ${SocialIcon.color}`}
            >
              <SocialIcon.icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
