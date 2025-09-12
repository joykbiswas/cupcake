import useAuth from "./useAuth";

const useAdmin = () => {
    const auth = useAuth();
    const user = auth?.user;
    const loading = auth?.loading;

    const isAdmin = user?.email === "admin@demo.com";
    const isAdminLoading = loading;

    return [isAdmin, isAdminLoading]
};

export default useAdmin;