import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import type { ReactNode } from "react";


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading;
    const location = useLocation();

    if(loading){
        return <progress className="progress progress-error w-56" ></progress>
    }
    if(user){
        return children
    }
    return <Navigate to='/signup' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;