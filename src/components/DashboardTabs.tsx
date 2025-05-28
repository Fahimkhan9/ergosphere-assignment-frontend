'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardTabs() {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    { key: 'documents', label: 'Documents', link: '/dashboard' },
    { key: 'upload', label: 'Upload', link: '/dashboard/upload' },
    { key: 'ask', label: 'Ask', link: '/dashboard/qa' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map(tab => {
          const isActive = pathname === tab.link
          return (
            <button
              key={tab.key}
              onClick={() => router.push(tab.link)}
              className={`py-2 px-4 font-medium transition-all border-b-2 ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
