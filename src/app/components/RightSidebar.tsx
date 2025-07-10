'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Video, Phone, Settings } from 'lucide-react'

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const [expanded, setExpanded] = useState(false)

  if (!isOpen) return null

  return (
    <aside className="w-72 bg-white border-l border-gray-200 overflow-y-auto fixed inset-y-0 right-0 z-40 mt-17">
      <div className="p-4 space-y-6">
        {/* Collapse and Close Button */}
        <button
          onClick={() => {
            setExpanded(false)
            onClose() // close the sidebar entirely
          }}
          className="bg-[#f5faff] border border-blue-100 p-2 rounded-md"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>

        {/* Profile Card (collapsed state only) */}
        {!expanded && (
          <div
            onClick={() => setExpanded(true)}
            className="cursor-pointer border border-blue-100 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition"
          >
            <Image
              src="/avatar.jpg"
              alt="Tutor Avatar"
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">Alex Dagota</h3>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Tutor</span>
            </div>
          </div>
        )}

        {/* Expanded State */}
        {expanded && (
          <>
            <p className="text-sm text-gray-600">
              Friendly and patient tutor specializing in breaking down complex concepts into digestible pieces.
            </p>

            {/* Call Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center px-3 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm">
                <Video className="w-4 h-4 mr-2" /> Video Call
              </button>
              <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg text-sm">
                <Phone className="w-4 h-4 mr-2" /> Call
              </button>
            </div>

            {/* Learning Tools */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Learning Tools</h4>
              <ul className="space-y-2 text-sm">
                {['Concept Coach', 'Practice Quiz', 'Study Notes', 'Progress Tracker'].map(tool => (
                  <li key={tool}>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                      {tool}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Settings */}
            <div className="pt-4">
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-1 text-gray-800">
                <Settings className="w-4 h-4" /> Interaction Settings
              </h4>

              {/* Style */}
              <label htmlFor="style" className="text-sm block mb-1 mt-2 text-gray-700">Style</label>
              <select
                id="style"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-blue-400 transition-all"
                defaultValue=""
              >
                <option value="" disabled>Pick an option...</option>
                <option>Karol Wojtyta</option>
                <option>John Paul II</option>
                <option>Polish Pope</option>
              </select>

              {/* Pace */}
              <label htmlFor="pace" className="text-sm block mb-1 mt-4 text-gray-700">Pace</label>
              <select
                id="pace"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-blue-400 transition-all"
                defaultValue=""
              >
                <option value="" disabled>Pick an option...</option>
                <option>Slow</option>
                <option>Moderate</option>
                <option>Fast</option>
              </select>

              {/* Mood */}
              <label htmlFor="mood" className="text-sm block mb-1 mt-4 text-gray-700">How are you feeling today?</label>
              <select
                id="mood"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-blue-400 transition-all"
                defaultValue=""
              >
                <option value="" disabled>Pick an option...</option>
                <option>Inspired</option>
                <option>Curious</option>
                <option>Overwhelmed</option>
              </select>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
