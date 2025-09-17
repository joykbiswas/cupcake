import axios from "axios";

// Use different baseURL for dev vs production
const axiosPublic = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000" // local backend, no /api
      : "https://cupcake-backend.vercel.app/api" // deployed backend, with /api
});

const useAxiosPublic = () => {
  return axiosPublic;
};
console.log("meta.env.MODE--", import.meta.env.MODE);
export default useAxiosPublic;


// https://cupcake-backend.vercel.app