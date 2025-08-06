'use client'

import Link from "next/link"
import { Card } from "./ui/card"
import { useJobs } from "@/hooks/useJobs"
import { Button } from "./ui/button"

const JobDetails = ({ id }: { id: string }) => {
  const { data: jobs, isLoading, error } = useJobs()

  if (!jobs || jobs.length === 0) {
    return <div>Loading...</div>
  }

const job = jobs.find((job: any) => String(job.id) === String(id))

  if (!job) return <div>Job not found</div>

  return (
    <Card className="gap-0 px-4">
      <h1 className="text-2xl font-bold text-primary">{job.job_title}</h1> {/* primary text color */}
      <p className="text-lg text-secondary">{job.employer_name}</p> {/* secondary text color */}
      <p className="text-sm text-muted-foreground">{job.job_location}</p> {/* muted text */}
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-primary">Description</h2>
        <p className="whitespace-pre-line line-clamp-6 text-foreground">{job.job_description}</p>
      </div>

    
      <div>
       
        <ul className="list-disc list-inside text-primary mt-5 space-y-2">
          <Button variant={"secondary"}>Apply now</Button>
        </ul>
      </div>
    </Card>
  )
}

export default JobDetails
