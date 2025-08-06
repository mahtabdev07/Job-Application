'use client'

import JobCard from "./JobCard"
import Link from "next/link"
import { useJobs } from "@/hooks/useJobs"

const JobContainer = () => {
const {data: jobs, isLoading, error } = useJobs()  
if(isLoading) return  <p>Loading...</p>
if(error) return <p>{error.message}</p>
console.log(jobs)
  return (
   <div className="space-y-2 w-full">
  {jobs?.map((job: any) => (
    <div key={job.id}>
     
        <JobCard job={job}  />
      
    </div>
  ))}
</div>


  )
}

export default JobContainer
