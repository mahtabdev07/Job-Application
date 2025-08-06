import axiosInstance from "@/lib/axios";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const userRegister = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
    },
    onError: (err: any) => {
      console.error("Registration failed:", err.response?.data || err.message);
    },
  });
};
