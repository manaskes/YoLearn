'use client'

import { useState } from 'react'
import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import ChatPanel from './components/ChatPanel'

export default function Home() {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header */}
      <Header toggleLeftSidebar={() => setIsLeftSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <LeftSidebar
          isOpen={isLeftSidebarOpen}
          onClose={() => setIsLeftSidebarOpen(false)}
        />

        {/* Main Chat Area with responsive padding */}
        <main
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-200 ease-in-out ${
            isRightSidebarOpen ? 'md:mr-70' : ''
          }`}
        >
          <ChatPanel
            isRightSidebarOpen={isRightSidebarOpen}
            toggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          />
        </main>

        {/* Right Sidebar - Desktop only (fixed) */}
        <div className="hidden md:block">
          <RightSidebar
            isOpen={isRightSidebarOpen}
            onClose={() => setIsRightSidebarOpen(false)}
          />
        </div>

        {/* Right Sidebar - Mobile overlay */}
        {isRightSidebarOpen && (
          <div >
            <div
              onClick={() => setIsRightSidebarOpen(false)}
            />
              <RightSidebar
                isOpen={true}
                onClose={() => setIsRightSidebarOpen(false)}
              />
          </div>
        )}
      </div>
    </div>
  )
}
