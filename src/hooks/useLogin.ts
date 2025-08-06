import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/features/auth/authSlice';
import axiosInstance from '@/lib/axios';

const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data;
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
    },
    onError: (err: any) => {
      console.error('Login failed:', err.response?.data || err.message);
    },
  });
};
