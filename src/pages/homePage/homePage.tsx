import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import ProductPage from "../../pages/ProductPage";
import { GRADIENTS } from "../../constants/colors";
import useAuth from "../../hooks/useAuth";


const HomePage = () => {
    const auth = useAuth();
    const user = auth?.user;
    console.log('user', user);
    return (
        <div
            className='overflow-x-hidden text-dark'
            style={{ background: GRADIENTS.PAGE_BACKGROUND }}
        >
            <div className='relative overflow-hidden'>
                {/* <Navbar /> */}
                <Hero />
                <Menu />
            </div>
            <Banner />
            <ProductPage />


            {/* <Login /> */}
            {/* <Footer /> */}

            {/*    <HomePage /> */}
        </div>
    );
};

export default HomePage;