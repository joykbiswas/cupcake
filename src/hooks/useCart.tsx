import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import type { AxiosError } from "axios";

const useCart = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const auth = useAuth();
    const user = auth?.user;
    const {refetch, data: cart = []} = useQuery({
      queryKey: ['cart', user?.email],
      queryFn: async () =>{
        if (!user?.email) return []; // Early return if no email
        const res = await axiosSecure.get(`/cart?email=${user?.email}`); // Changed to /cart (singular)
        return res.data;
      },
      retry: (failureCount, error: AxiosError) => {
        if (error.response?.status === 404) return false;
        return failureCount < 3;
      },
      enabled: !!user?.email, // Only run if email exists
    })
    return[cart, refetch]
};

export default useCart;