import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Bookmark, 
  BookmarkCheck,
  Briefcase, 
  MapPin, 
  DollarSign,
  Calendar,
  Building2,
  User,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface Job {
  id: string
  job_title: string
  employer_name?: string | null
  job_description: string
  job_location?: string
  job_employment_type_text?: string | null
  job_posted_human_readable?: string | null
  salary_min?: number
  salary_max?: number
  createdAt: string
  postedByUserId: string
  companyId: string
  company?: {
    id: string
    name: string
    email: string
    createdAt: string
    ownerId: string
  }
  postedBy?: {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
  }
}

interface JobCardProps {
  job: Job
  onSave?: (jobId: string) => void
  onUnsave?: (jobId: string) => void
  isSaved?: boolean
  onJobClick?: (job: Job) => void
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onSave, 
  onUnsave, 
  isSaved = false,
  onJobClick 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved)

  const {
    id,
    job_title,
    job_employment_type_text,
    job_location,
    job_description,
    job_posted_human_readable,
    salary_min,
    salary_max,
    createdAt,
    company,
    postedBy,
  } = job

  // Get company name from company object or fallback to employer_name or postedBy name
  const companyName = company?.name || job.employer_name || postedBy?.name || 'Unknown Company'
  
  // Format salary range
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }
    if (min) return `From $${min.toLocaleString()}`
    if (max) return `Up to $${max.toLocaleString()}`
    return null
  }

  // Format posted date
  const formatPostedDate = () => {
    if (job_posted_human_readable) return job_posted_human_readable
    
    const postedDate = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - postedDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (isBookmarked) {
      onUnsave?.(id)
    } else {
      onSave?.(id)
    }
    setIsBookmarked(!isBookmarked)
  }



  const salaryRange = formatSalary(salary_min, salary_max)

  return (
    <Card 
      className="w-full cursor-pointer hover:shadow-md transition-all duration-300 p-0 overflow-hidden"
      
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          {/* Left Section */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Job Title and Company */}
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {job_title}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 size={16} className="flex-shrink-0" />
                <span className="font-medium">{companyName}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {job_employment_type_text && (
                <Badge variant="secondary">
                  <Briefcase size={12} className="mr-1" />
                  {job_employment_type_text}
                </Badge>
              )}
              
              {job_location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{job_location}</span>
                </div>
              )}

              {salaryRange && (
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  <span className="font-medium">{salaryRange}</span>
                </div>
              )}
            </div>

            {/* Job Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {truncateDescription(job_description)}
            </p>

            {/* Posted Date and Posted By */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatPostedDate()}</span>
              </div>
              
              {postedBy && (
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>Posted by {postedBy.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          {/* <div className="flex flex-col items-center gap-4 flex-shrink-0">
           

            Bookmark Button
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkClick}
              className={`h-10 w-10 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-primary bg-accent hover:bg-accent/80' 
                  : 'hover:bg-accent'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck  className="size-20 fill-current" />
              ) : (
                <Bookmark className='!h-10 size' />
              )}
            </Button>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex gap-2">
      
            <Link href={`/seeker/job/${id}`}><Button  variant={'link'} size="sm">
              View Details
            </Button></Link>
          </div>
          
          {/* Company info */}
          <div className="text-xs text-muted-foreground">
            ID: {id.slice(-8)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard