import JobContainer from '@/components/JobContainer'
import { FilterIcon } from 'lucide-react'
import React from 'react'

const SeekerDashboard = () => {
  return (
    <div className="flex flex-col gap-4  items-start ">
      <div className="sort md:hidden hidden px-2 justify-between mt-2 w-full items-center">
        <div className="emp cursor-pointer"><FilterIcon size={'20'}/></div>
        <div className="s">
            <select name="" id="">
                <option value="">Relevance</option>
                <option value="">Date</option>
            </select>
        </div>
      </div>
        <JobContainer/>
        
      
    </div>
  )
}

export default SeekerDashboard