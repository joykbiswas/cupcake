import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import type { Cake } from "../types/cake";

const useAddToCart = () => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const addToCart = (product: Cake) => {
    if (user && user.email) {
      const cartItem = {
        menuId: product._id,
        email: user.email,
        name: product.name,
        category: product.category,
        image: Array.isArray(product.images)
          ? product.images[0]
          : product.images,
        price: product.price,
      };
      
      return axiosSecure
        .post("/cart", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.name} added to your cart!`,
              showConfirmButton: false,
              timer: 1500,
            });
            queryClient.invalidateQueries({ queryKey: ["cart", user.email] });
            return true;
          }
          return false;
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          Swal.fire("Error", "Failed to add to cart.", "error");
          return false;
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: window.location.pathname } });
        }
      });
      return Promise.resolve(false);
    }
  };

  return { addToCart };
};

export default useAddToCart;