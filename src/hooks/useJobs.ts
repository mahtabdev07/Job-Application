// hooks/useJobs.ts
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchJobs = async () => {
  const res = await axiosInstance.get("/job/all"); // assuming that's your endpoint
  return res.data;
};

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
};
