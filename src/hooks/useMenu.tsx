import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () =>{
  const axiosPublic = useAxiosPublic();
    
  const {data: currentItems = [],isPending: loading, refetch} =useQuery({
    queryKey: ['currentItems'],
    queryFn: async() =>{
      const res = await axiosPublic.get('/cake');
      return res.data
    }
  })
  return [currentItems, loading, refetch]

}
export default useMenu;