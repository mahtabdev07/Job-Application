"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, 
  Pencil, 
  Plus, 
  Trash2, 
  MapPin, 
  Users, 
  Building2, 
  Eye,
  Star,
  Calendar,
  Globe,
  Search
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAllCompanies } from "@/hooks/useAllCompanies";
import { useMyCompanies } from "@/hooks/useMyCompanies";
import Link from "next/link";
import { useDeleteCompany } from "@/hooks/useDeleteCompany";
import { Input } from "@/components/ui/input";

const CompanyPage = () => {
  const router = useRouter();
  const { data: myCompanies } = useMyCompanies();
  const { data: companies, isLoading } = useAllCompanies();
  const { mutate: deleteCompany, isPending } = useDeleteCompany();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRedirect = () => {
    router.push("/company/create");
  };

  const handleEdit = (id: string) => {
    router.push(`/company/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id);
    }
  };

  const handleCreateJob = (id: string) => {
    router.push(`/company/${id}/job/create`);
  };

  const handleRedirectToDetailPage = (id: string) => {
    router.push(`/company/detail/${id}`);
  };

  // Filter companies based on search term
  const filteredCompanies = companies?.filter((company: any) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-black/10 border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Company Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Manage your companies and explore opportunities with leading organizations
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* My Companies Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-foreground mb-2">My Companies</h2>
              <p className="text-muted-foreground">
                Companies you've created and manage
              </p>
            </div>
            <Link href="/company/create">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Company
              </Button>
            </Link>
          </div>

          {myCompanies && myCompanies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {myCompanies.map((company: any) => (
                <Card
                  key={company.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                >
                  <div className="p-6">
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                          <AvatarImage src={company.logo} alt={company.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            {company.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            Owner
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                        {company.industry}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Est. {new Date(company.createdAt || Date.now()).getFullYear()}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 min-h-[4.5rem]">
                      {company.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCreateJob(company.id)}
                        className="flex-1 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Job
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(company.id)}
                        className="hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(company.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                        disabled={isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-2 border-dashed border-muted-foreground/25 bg-muted/10">
              <div className="p-12 text-center">
                <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No companies yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start by creating your first company to manage jobs and opportunities
                </p>
                <Link href="/company/create">
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Company
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </section>

        {/* Explore Companies Section */}
        <section>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-3xl font-bold text-foreground mb-2">Explore Companies</h2>
                <p className="text-muted-foreground">
                  Discover opportunities with leading organizations
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies?.map((company: any) => (
                <Card
                  key={company.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden"
                  onClick={() => handleRedirectToDetailPage(company.id)}
                >
                  <div className="p-6">
                    {/* Company Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                          {company.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                          {company.name}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          4.{Math.floor(Math.random() * 9) + 1} • {Math.floor(Math.random() * 500) + 50} reviews
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{company.industry}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{company.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        {Math.floor(Math.random() * 1000) + 100}+ employees
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 min-h-[4.5rem]">
                      {company.description}
                    </p>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedirectToDetailPage(company.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Openings
                    </Button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              ))}
            </div>

            {filteredCompanies?.length === 0 && searchTerm && (
              <Card className="border-2 border-dashed border-muted-foreground/25 bg-muted/10">
                <div className="p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    No companies found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse all companies
                  </p>
                </div>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyPage;
