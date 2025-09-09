import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

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
      retry: (failureCount, error) => {
        // Don't retry on 404 (resource not found, e.g., empty cart)
        if (error?.response?.status === 404) return false;
        return failureCount < 3; // Default retry for other errors
      },
      enabled: !!user?.email, // Only run if email exists
    })
    return[cart, refetch]
};

export default useCart;