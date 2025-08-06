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

      <section className="w-full max-w-6xl mx-auto px-4 py-20">
        {/* Featured Categories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-lg text-muted-foreground">Find opportunities in your field of expertise</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {[
            { name: "Technology", icon: "💻", jobs: "50,000+" },
            { name: "Healthcare", icon: "🏥", jobs: "30,000+" },
            { name: "Finance", icon: "💰", jobs: "25,000+" },
            { name: "Education", icon: "📚", jobs: "20,000+" },
            { name: "Marketing", icon: "📈", jobs: "18,000+" },
            { name: "Design", icon: "🎨", jobs: "15,000+" },
            { name: "Sales", icon: "🤝", jobs: "22,000+" },
            { name: "Engineering", icon: "⚙️", jobs: "35,000+" }
          ].map((category, index) => (
            <Link
              href={'/seeker/dashboard'} 
              key={index}
              className="bg-secondary/50 hover:bg-secondary rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.jobs} jobs</p>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-primary/10 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join millions of job seekers</h2>
            <p className="text-lg text-muted-foreground">Your dream career is just one click away</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5M+", label: "Active Jobs" },
              { number: "2M+", label: "Companies" },
              { number: "10M+", label: "Job Seekers" },
              { number: "500K+", label: "Success Stories" }
            ].map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Get hired in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              step: "01",
              title: "Create Your Profile",
              description: "Build a compelling profile that showcases your skills and experience",
              icon: "👤"
            },
            {
              step: "02", 
              title: "Apply to Jobs",
              description: "Browse and apply to thousands of jobs that match your preferences",
              icon: "📝"
            },
            {
              step: "03",
              title: "Get Hired",
              description: "Connect with employers and land your dream job",
              icon: "🎉"
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-background rounded-full shadow-lg flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to find your next opportunity?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-3 text-lg">
              Get Started Now
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home