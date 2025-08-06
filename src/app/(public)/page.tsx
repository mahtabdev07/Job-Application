'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Building } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Job {
  id: string
  job_title: string
  employer_name: string
  job_location?: string
  job_employment_type_text?: string
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Job[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Debounce search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchJobs(searchQuery)
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchJobs = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/job/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const jobs = await response.json()
        setSearchResults(jobs.slice(0, 6)) // Limit to 6 results for dropdown
        setShowDropdown(jobs.length > 0)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowDropdown(false)
    }
  }

  const handleJobClick = (job: Job) => {
    setSearchQuery(job.job_title)
    setShowDropdown(false)
    router.push(`/search?q=${encodeURIComponent(job.job_title)}`)
  }

  const handleViewAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setShowDropdown(false)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="flex flex-col mt-20 gap-2 items-center w-full justify-center max-w-4xl px-4">
        <h1 className="text-5xl font-bold text-center">Find your dream job now</h1>
        <p className="text-lg text-muted-foreground">5 lakh+ jobs for you to explore</p>
        
        {/* Search with Dropdown */}
        <div ref={searchRef} className="relative w-full max-w-2xl mt-5">
          <form onSubmit={handleSearchSubmit} className="flex rounded-3xl items-center border p-4">
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 2 && searchResults.length > 0 && setShowDropdown(true)}
              className="border-none bg-background dark:bg-background max-w-2xl w-full shadow-none outline-none" 
              placeholder="Search for jobs, companies..." 
            />
            <Button type="submit" className="ml-2">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm">Searching...</p>
                </div>
              ) : (
                <>
                  {searchResults.map((job) => (
                    <div 
                      key={job.id}
                      onClick={() => handleJobClick(job)}
                      className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {job.job_title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              <span className="line-clamp-1">{job.employer_name}</span>
                            </div>
                            {job.job_location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{job.job_location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {job.job_employment_type_text && (
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full ml-2 flex-shrink-0">
                            {job.job_employment_type_text}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {searchResults.length > 0 && (
                    <div className="p-3 border-t bg-accent">
                      <button 
                        onClick={handleViewAllResults}
                        className="w-full text-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home