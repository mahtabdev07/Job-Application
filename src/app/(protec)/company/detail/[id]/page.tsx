'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCompanyById } from '@/hooks/useCompanyByID'
import JobCard from '@/components/JobCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Globe,
  Mail,
  User,
  Star,
  ArrowLeft,
  ExternalLink,
  Phone,
  Award,
  TrendingUp
} from 'lucide-react'

const CompanyDetail = () => {
  const params = useParams()
  const router = useRouter()
  const companyId = params?.id as string
  const { data: company, isLoading, isError } = useCompanyById(companyId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading company details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-8 text-center max-w-md">
            <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Something went wrong
            </h3>
            <p className="text-muted-foreground mb-4">
              Unable to fetch company details. Please try again later.
            </p>
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const handleJobClick = (job: any) => {
    router.push(`/job/${job.id}`)
  }

  const companyStats = [
    { label: 'Founded', value: new Date(company.createdAt).getFullYear(), icon: Calendar },
    { label: 'Employees', value: `${Math.floor(Math.random() * 1000) + 100}+`, icon: Users },
    { label: 'Rating', value: `4.${Math.floor(Math.random() * 9) + 1}`, icon: Star },
    { label: 'Open Roles', value: company.jobs.length, icon: Briefcase }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-b">
        <div className="container mx-auto px-6 py-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4 hover:bg-background/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Company Hero Section */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Company Logo & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-lg">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-2xl font-bold">
                    {company.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {company.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Building2 className="w-4 h-4 mr-2 text-primary" />
                      {company.industry}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {company.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {company.description}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3 min-w-fit">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
                <Button variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Follow Company
                </Button>
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Openings */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Current Openings</h2>
                    <Badge variant="secondary" className="text-sm">
                      {company.jobs.length} positions
                    </Badge>
                  </div>
                </div>

                {company.jobs.length > 0 ? (
                  <div className="space-y-4">
                    {company.jobs.map((job: any) => (
                      <div key={job.id} className="group">
                        <JobCard 
                          job={job} 
                          onJobClick={handleJobClick}
                          className="hover:shadow-lg transition-all duration-200 border-0 bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed border-muted-foreground/25 bg-muted/10">
                    <div className="p-8 text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                        No openings available
                      </h3>
                      <p className="text-muted-foreground">
                        This company doesn't have any job openings at the moment. Check back later!
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </Card>

            {/* Company Culture & Benefits */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Why Work Here?</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-primary">Company Culture</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Collaborative and inclusive environment</li>
                      <li>• Innovation-driven workspace</li>
                      <li>• Work-life balance priority</li>
                      <li>• Continuous learning opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-primary">Benefits & Perks</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Competitive salary packages</li>
                      <li>• Health & wellness programs</li>
                      <li>• Flexible working arrangements</li>
                      <li>• Professional development budget</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Owner */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Company Owner</h3>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {company.owner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{company.owner.name}</p>
                    <p className="text-sm text-muted-foreground">Founder & CEO</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{company.owner.email}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Company Stats */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Company Insights</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Industry Rank</span>
                    <Badge variant="secondary">#12 in {company.industry}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Growth Rate</span>
                    <span className="text-sm font-semibold text-green-600">+23% YoY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Employee Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">4.{Math.floor(Math.random() * 9) + 1}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Get in Touch</h3>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail
