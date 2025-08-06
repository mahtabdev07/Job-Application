// hooks/filterJobs.ts
import { useQuery } from '@tanstack/react-query'

const fetchFilteredJobs = async (searchParams: string) => {
  const res = await fetch(`/api/job/search${searchParams}`)
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json()
}

export const useFilterJobs = (searchParams: string) => {
  return useQuery({
    queryKey: ['jobs', searchParams],
    queryFn: () => fetchFilteredJobs(searchParams),
    enabled: !!searchParams, // prevent initial call if empty
  })
}
