import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const auth = useAuth();
    const googleSignIn = auth?.googleSignIn;
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location =useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('user location login', location.state);

    const handleGoogleSignIn =() =>{
       googleSignIn?.()
       .then(result =>{
        console.log(result.user);
        const userInfo ={
            email: result.user?.email,
            name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res =>{
            console.log(res.data);
            navigate(from, {replace: true});
        })
       })
    }
    return (
        <div>
           
            <div className=" pl-8">
            {/* <div className="divider"></div> */}
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-4"></FaGoogle>
                    Google 
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;