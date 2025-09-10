import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://cupcake-backend.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;