import Banner from "../../components/Banner/Banner";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import Review from "../../components/Review/Review";

import ProductPage from "../../pages/ProductPage";
import { COLORS } from "../../constants/colors";
import useAuth from "../../hooks/useAuth";
import ProductNavigation from "../../components/ProductNavigation/ProductNavigation";
import Newsletter from "../../components/NewsLetter/NewsLetter";


const HomePage = () => {
    const auth = useAuth();
    const user = auth?.user;
    console.log('user', user);
    return (
        <div
            className='overflow-x-hidden text-dark'
            style={{ background: COLORS.BG_PRIMARY }}
        >
            <div className='relative overflow-hidden'>
                {/* <Navbar /> */}
                <Hero />
                <Menu />
            </div>
            <Banner />
            <ProductPage />
            <Review />
            <ProductNavigation />
            <Newsletter />

        </div>
    );
};

export default HomePage;