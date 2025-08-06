import AdsContainer from '@/components/AdsContainer'
import Filter from '@/components/Filter'
import SeekerNavbar from '@/components/layout/SeekerNavbar'
import React, { Suspense } from 'react'

const dashboardLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className=''>
      <header className="fixed top-0 left-0 z-50 w-full bg-card border-b">
        <div className="max-w-screen-xl px-2 md:px-4 mx-auto">
          <SeekerNavbar />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto flex gap-4 pt-20 md:px-4 px-1 md:pt-24">
        {/* Left Sidebar */}
        <aside className="sticky top-20 h-fit hidden md:flex basis-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <Filter />
          </Suspense>
        </aside>

          <div className="w-full ">
            <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
              {children}
            </Suspense>
          </div>
        

        
      </main>
    </div>
  )
}

export default dashboardLayout