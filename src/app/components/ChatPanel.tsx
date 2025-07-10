import { useState } from 'react'
import { sendMessage } from '../hooks/useChat'
import { Mic, Paperclip, Send } from 'lucide-react'
import Image from 'next/image'

interface ChatPanelProps {
  isRightSidebarOpen: boolean
  toggleRightSidebar: () => void
}

export default function ChatPanel({ isRightSidebarOpen, toggleRightSidebar }: ChatPanelProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = { text: message, sender: 'user' as const }
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const aiResponse = await sendMessage(message)
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', sender: 'ai' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">

      {/* Toggle right sidebar button for mobile view */}
      <div className="flex md:hidden justify-end px-4 pt-2">
        <button onClick={toggleRightSidebar} className="text-gray-500 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="rounded-full mb-4">
              <Image
                src="/avatar.jpg"
                alt="Avatar"
                width={92}
                height={92}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Hello there!</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Ready to learn something new? Start the conversation by saying hi or asking a question.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setMessage('Hi')
                  document.querySelector('input')?.focus()
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Say Hi
              </button>
              <button
                onClick={toggleRightSidebar}
                className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50"
              >
                {isRightSidebarOpen ? 'Hide Companion' : 'Show Companion'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex flex-col max-w-[80%]">
                  <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm
                    ${msg.sender === 'user'
                      ? 'bg-[#d7ebff] rounded-tr-none self-end text-gray-800'
                      : 'bg-[#f5f5f5] rounded-tl-none self-start text-gray-800'
                    }`}>
                    {msg.text}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.sender === 'user' ? 'Jon' : 'Darry'} • 5:56 PM
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#f5f5f5] rounded-xl p-3 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message ..."
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="ml-2 text-white p-3 rounded-full disabled:opacity-50 transition duration-200 hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #FB7700, #FFC400)',
              boxShadow: '0 4px 14px rgba(251, 119, 0, 0.4)'
            }}
          >
            <Send className="h-5 w-5" />
          </button>

        </div>
      </div>
    </div>
  )
}
