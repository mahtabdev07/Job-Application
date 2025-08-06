'use client'

import { Card } from "./ui/card"
import { useJobs } from "@/hooks/useJobs"

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
        <p className="whitespace-pre-line text-foreground">{job.job_description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 text-primary">Responsibilities</h2>
        <ul className="list-disc list-inside text-foreground space-y-1">
          {job.job_highlights?.Responsibilities?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 text-primary">Qualifications</h2>
        <ul className="list-disc list-inside text-foreground space-y-1">
          {job.job_highlights?.Qualifications?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 text-primary">Apply Links</h2>
        <ul className="list-disc list-inside text-primary space-y-2">
          {job.apply_options?.map((option: any, index: number) => (
            <li key={index}>
              <a 
                href={option.apply_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-primary/80"
              >
                {option.publisher}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default JobDetails
