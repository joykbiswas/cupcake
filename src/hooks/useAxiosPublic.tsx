import axios from "axios";

// Use different baseURL for dev vs production
const axiosPublic = axios.create({
    baseURL:'https://cupcake-backend.vercel.app'
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;


// https://cupcake-backend.vercel.app