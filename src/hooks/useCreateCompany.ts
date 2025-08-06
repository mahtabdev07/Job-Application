import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type CompanyData = {
  name: string;
  industry: string;
  location: string;
  description: string;
};

export const createCompany = async (data: CompanyData) => {
  const res = await axiosInstance.post("/company/create", data);
  return res.data;
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      console.log("Job posted successfully:", data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
