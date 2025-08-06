import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

//get user
export const User = async () => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: User,
  });
};
