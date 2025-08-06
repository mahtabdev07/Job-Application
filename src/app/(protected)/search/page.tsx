"use client";

import { useSearchParams } from "next/navigation";
import { useFilterJobs } from "@/hooks/filterJobs";
import JobCard from "@/components/JobCard";
import JobListSkeleton from "@/components/common/JobListSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();

  // Convert searchParams to the format expected by the API
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const { data: jobs, isLoading, error } = useFilterJobs(queryString);

  console.log("Search params:", searchParams.toString());
  console.log("Query string:", queryString);
  console.log("Jobs data:", jobs);

  if (isLoading) {
    return <JobListSkeleton count={5} />;
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="text-center">
          <p className="text-red-500">Error loading jobs: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{jobs?.length || 0} Jobs Found</h1>
        {searchParams.get("q") && (
          <p className="text-gray-600">
            Showing results for "{searchParams.get("q")}"
          </p>
        )}
      </div>

      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job: any) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobs found matching your criteria.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
