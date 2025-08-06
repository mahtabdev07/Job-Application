"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/getUser";
import { Menu, X, Briefcase, Building2, User, LogOut } from "lucide-react";
import { useState } from "react";

const PublicNavbar = () => {
  const { data: user, isLoading: userLoading, error } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold transition-colors hover:text-primary"
          >
            <span className="hidden text-2xl sm:inline-block">JobApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/seeker/dashboard"
              className="flex items-center space-x-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link
              href="/companies"
              className="flex items-center space-x-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <Building2 className="h-4 w-4" />
              <span>Companies</span>
            </Link>
          </div>

          {/* Desktop Auth Buttons / User Profile */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="hidden lg:inline text-foreground/80">Welcome back,</span>
                  <span className="font-medium">{user.name?.split(' ')[0]}</span>
                </div>
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm ring-2 ring-background shadow-lg">
                    {user.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-border/40 pb-3 pt-2">
              {/* Mobile Navigation Links */}
              <Link
                href="/seeker/dashboard"
                className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
              <Link
                href="/companies"
                className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                <span>Companies</span>
              </Link>

              {/* Mobile Auth Section */}
              <div className="border-t border-border/40 pt-3">
                {!user ? (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start font-medium">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full font-medium">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                        {user.name?.charAt(0).toUpperCase() || <User className="h-3 w-3" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-foreground/60">{user.email}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
