import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div className='flex flex-row min-h-screen justify-center items-center bg-gray-100'>
      <Link href='/dashboard'><button className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 text-lg font-semibold">
        Go To Dashboard
      </button></Link>
    </div>
  )
}

export default HomePage
