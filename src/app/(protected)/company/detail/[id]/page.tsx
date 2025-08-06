'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useCompanyById } from '@/hooks/useCompanyByID'
import JobCard from '@/components/JobCard'  // adjust path as needed

const CompanyDetail = () => {
  const params = useParams()
  const companyId = params?.id as string
  const { data: company, isLoading, isError } = useCompanyById(companyId)

  if (isLoading) return <p>Loading company details...</p>
  if (isError) return <p>Something went wrong while fetching the company details.</p>

  // Optional: handle clicking a job card
  const handleJobClick = (job : any) => {
    // e.g. navigate to job detail page
    // router.push(`/jobs/${job.id}`)
    console.log('Job clicked:', job)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <p className="text-muted-foreground">{company.industry} · {company.location}</p>
        <p className="mt-4 text-sm text-gray-600">{company.description}</p>
        <p className="mt-2 text-xs text-gray-400">
          Created on: {new Date(company.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Job Openings</h2>
        {company.jobs.length > 0 ? (
          <div className="grid gap-4">
            {company.jobs.map((job : any) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onJobClick={handleJobClick} 
                // optionally pass onSave, onUnsave, isSaved props if you have saved jobs feature
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No job openings available.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-10">Owner</h2>
        <div className="mt-2 text-sm text-gray-700">
          <p><strong>Name:</strong> {company.owner.name}</p>
          <p><strong>Email:</strong> {company.owner.email}</p>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail
