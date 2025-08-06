"use client";

import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MapPin, Briefcase, Filter as FilterIcon, X } from "lucide-react";
import { Button } from "./ui/button";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Checkbox filter handler
  const updateQuery = useCallback(
    (name: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      const existingValues = params.getAll(name);

      if (checked) {
        params.append(name, value);
      } else {
        const updated = existingValues.filter((v) => v !== value);
        params.delete(name);
        updated.forEach((v) => params.append(name, v));
      }

      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push('/search');
  }, [router]);

  // Get active filter count
  const getActiveFiltersCount = () => {
    return searchParams.getAll("job_employment_type_text").length + 
           searchParams.getAll("location").length +
           searchParams.getAll("salary_range").length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const handleToggle = useCallback((name: string, value: string, currentState: boolean) => {
    updateQuery(name, value, !currentState);
  }, [updateQuery]);

  return (
    <Card className="w-full border-0 shadow-sm bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground h-8 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Job Type Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Job Type</h3>
            </div>
            <div className="space-y-3 pl-6">
              {[
                { value: "onsite", label: "On-site", desc: "Work from office" },
                { value: "remote", label: "Remote", desc: "Work from anywhere" },
                { value: "hybrid", label: "Hybrid", desc: "Flexible arrangement" }
              ].map((type) => {
                const isChecked = searchParams
                  .getAll("job_employment_type_text")
                  .includes(type.value);

                return (
                  <div key={type.value} className="group">
                    <div 
                      className="flex items-start space-x-3 cursor-pointer"
                      onClick={() => handleToggle("job_employment_type_text", type.value, isChecked)}
                    >
                      <Checkbox
                        id={type.value}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          updateQuery("job_employment_type_text", type.value, !!checked)
                        }
                        className="mt-0.5"
                      />
                      <div className="flex-1 cursor-pointer">
                        <Label 
                          htmlFor={type.value}
                          className={`text-sm cursor-pointer transition-colors ${
                            isChecked 
                              ? 'text-foreground font-medium' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        >
                          {type.label}
                        </Label>
                        <p className="text-xs text-muted-foreground/80 mt-0.5 cursor-pointer">
                          {type.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Location</h3>
            </div>
            <div className="space-y-3 pl-6">
              {[
                { value: "himachal", label: "Himachal Pradesh", desc: "Mountain state" },
                { value: "dehradun", label: "Dehradun", desc: "Capital city" },
                { value: "shimla", label: "Shimla", desc: "Hill station" }
              ].map((location) => {
                const isChecked = searchParams
                  .getAll("location")
                  .includes(location.value);

                return (
                  <div key={location.value} className="group">
                    <div 
                      className="flex items-start space-x-3 cursor-pointer"
                      onClick={() => handleToggle("location", location.value, isChecked)}
                    >
                      <Checkbox
                        id={location.value}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          updateQuery("location", location.value, !!checked)
                        }
                        className="mt-0.5"
                      />
                      <div className="flex-1 cursor-pointer">
                        <Label 
                          htmlFor={location.value}
                          className={`text-sm cursor-pointer transition-colors ${
                            isChecked 
                              ? 'text-foreground font-medium' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        >
                          {location.label}
                        </Label>
                        <p className="text-xs text-muted-foreground/80 mt-0.5 cursor-pointer">
                          {location.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Salary Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <span className="text-sm">₹</span>
              <h3 className="text-sm font-semibold text-foreground">Salary Range</h3>
            </div>
            <div className="space-y-3 pl-6">
              {[
                { value: "0-3", label: "0 - 3 LPA", desc: "Entry level" },
                { value: "3-6", label: "3 - 6 LPA", desc: "Mid level" },
                { value: "6-10", label: "6 - 10 LPA", desc: "Senior level" },
                { value: "10+", label: "10+ LPA", desc: "Executive level" }
              ].map((salary) => {
                const isChecked = searchParams
                  .getAll("salary_range")
                  .includes(salary.value);

                return (
                  <div key={salary.value} className="group">
                    <div 
                      className="flex items-start space-x-3 cursor-pointer"
                      onClick={() => handleToggle("salary_range", salary.value, isChecked)}
                    >
                      <Checkbox
                        id={salary.value}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          updateQuery("salary_range", salary.value, !!checked)
                        }
                        className="mt-0.5"
                      />
                      <div className="flex-1 cursor-pointer">
                        <Label 
                          htmlFor={salary.value}
                          className={`text-sm cursor-pointer transition-colors ${
                            isChecked 
                              ? 'text-foreground font-medium' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        >
                          {salary.label}
                        </Label>
                        <p className="text-xs text-muted-foreground/80 mt-0.5 cursor-pointer">
                          {salary.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filter;
