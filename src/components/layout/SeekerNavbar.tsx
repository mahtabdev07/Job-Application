"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Search,
  MapPin,
  Building,
  User,
  Settings,
  LogOut,
  FileText,
  Heart,
  Bell,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/getUser";

interface Job {
  id: string;
  job_title: string;
  employer_name: string;
  job_location?: string;
  job_employment_type_text?: string;
}

const SeekerNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: user, isLoading: userLoading, error } = useUser();

  console.log(user);

  // Debounce search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchJobs(searchQuery);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchJobs = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/job/search?q=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const jobs = await response.json();
        setSearchResults(jobs.slice(0, 6));
        setShowDropdown(jobs.length > 0);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleJobClick = (job: Job) => {
    setSearchQuery(job.job_title);
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(job.job_title)}`);
  };

  const handleViewAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <header className="md:px-4 flex items-center justify-between bg-background lg:bg-transparent rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-xl lg:bg-opacity-30  w-full md:h-16 h-16">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/seeker/dashboard"
            className="flex items-center space-x-2"
          >
            <h1 className="text-2xl font-bold text-primary">JobApp</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/seeker/dashboard"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="/seeker/companies"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Companies
            </Link>
          </nav>
        </div>

        {/* Search Section */}
        <div
          ref={searchRef}
          className="relative hidden lg:flex flex-1 max-w-md mx-8"
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.length > 2 &&
                  searchResults.length > 0 &&
                  setShowDropdown(true)
                }
                className="pl-10 pr-4 rounded-full h-10 border-black/40 bg-card border-1 shadow-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Search jobs, companies..."
              />
            </div>
          </form>

          {/* Search Dropdown */}
          {showDropdown && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
              <CardContent className="p-0 max-h-96 overflow-y-auto hide-scrollbar">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-6 space-y-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">
                      Searching...
                    </p>
                  </div>
                ) : (
                  <>
                    {searchResults.map((job, index) => (
                      <div key={job.id}>
                        <div
                          onClick={() => handleJobClick(job)}
                          className="flex items-start justify-between p-4 hover:bg-background cursor-pointer transition-colors"
                        >
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-medium leading-none">
                              {job.job_title}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                <span>{job.employer_name}</span>
                              </div>
                              {job.job_location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{job.job_location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {job.job_employment_type_text && (
                            <Badge variant="secondary" className="ml-2">
                              {job.job_employment_type_text}
                            </Badge>
                          )}
                        </div>
                        {index < searchResults.length - 1 && <Separator />}
                      </div>
                    ))}

                    {searchResults.length > 0 && (
                      <>
                        <Separator />
                        <div className="p-3">
                          <Button
                            onClick={handleViewAllResults}
                            variant="ghost"
                            className="w-full justify-center text-sm"
                          >
                            View all results for "{searchQuery}"
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Post Job Button */}
          <Link href="/company">
            <Button
              variant="secondary"
              size="sm"
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Post a Job
            </Button>
          </Link>
          {/* Authentication Section */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/seeker/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/seeker/applications"
                      className="flex items-center"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Applications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/seeker/saved-jobs"
                      className="flex items-center"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Saved Jobs</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/seeker/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SeekerNavbar;
