import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../assets/cake2.png";
import slide2 from "../../assets/cake3.png";
import slide3 from "../../assets/cake4.png";
import slide4 from "../../assets/cake.png";
import slide5 from "../../assets/bg-hero.png";
import { motion } from 'framer-motion';
import { SlideUp } from '../Hero/Hero';
import { GRADIENTS } from '../../constants/colors';


const Menu = () => {
    return (
        <section 
            className="gradient-menu-section"
            style={{
                background: GRADIENTS.MENU_SECTION,
            }}
        >
            <div className='max-w-screen-2xl mx-auto p-12 py-12'>
                <motion.h3
                    variants={SlideUp(0)}
                    initial="hidden"
                    whileInView="show"
                    className='text-2xl font-semibold text-secondary uppercase py-8 gradient-text-rainbow'
                >
                    Our Menu
                </motion.h3>
                {/* grid section  */}
                <div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper mb-16 "
                    >
                        {[
                            { img: slide1, label: "Salads" },
                            { img: slide2, label: "Pizza" },
                            { img: slide3, label: "Soup" },
                            { img: slide4, label: "Desserts" },
                            { img: slide5, label: "Salads" }
                        ].map((item, idx) => (
                            <SwiperSlide
                                key={idx}
                                className="group border border-[#854101]/20 bg-white rounded-lg p-4 shadow-sm transition duration-300 ease-out hover:shadow-md hover:-translate-y-1 gradient-card-hover"
                                style={{
                                    background: GRADIENTS.CARD_GRADIENT,
                                    border: '1px solid transparent',
                                    backgroundImage: GRADIENTS.CARD_GRADIENT,
                                }}
                            >
                                <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                                    />
                                </div>
                                <p className="text-xl uppercase text-center mt-4 text-gray-700 font-semibold">
                                    {item.label}
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>            
            </div>
            {/* Background blue  */}
            {/* <motion.div
        initial={{ opacity: 0, rotate: 60, x: 200, y: 100 }}
        whileInView={{ opacity: 1, rotate: 40, x: 0, y: 0 }}
        className="w-[900px] h-[900px] rounded-3xl
            bg-blue-600 absolute top-[55%] right-[-50%] z-10 "
      ></motion.div> */}
        </section>
    )
}

export default Menu