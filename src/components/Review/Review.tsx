
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

const reviews = [
    {
        quote: "The cake was absolutely delicious! It was the centerpiece of our celebration and everyone loved it.",
        name: "Jane Doe",
        title: "Event Planner",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        quote: "I ordered a custom cake for my daughter's birthday and it exceeded all my expectations. The design was beautiful and it tasted even better.",
        name: "John Smith",
        title: "Proud Parent",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
    },
    {
        quote: "The best cupcakes I've ever had! I'll definitely be a returning customer.",
        name: "Peter Jones",
        title: "Food Blogger",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
    },
    {
        quote: "A must-try for all cake lovers. You won't be disappointed. The quality is top-notch.",
        name: "Sarah Lee",
        title: "Dessert Enthusiast",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
    },
    {
        quote: "The cake was absolutely delicious! It was the centerpiece of our celebration and everyone loved it.",
        name: "Jane Doe",
        title: "Event Planner",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        quote: "I ordered a custom cake for my daughter's birthday and it exceeded all my expectations. The design was beautiful.",
        name: "John Smith",
        title: "Proud Parent",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
    },
];

const Review = () => {
    return (
        <div className="max-w-screen-2xl mx-auto p-12 py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 font-light italic">What Our Customers Say</h2>
                    <p className="text-gray-600 mt-2">Honest feedback from our valued clients.</p>
                </motion.div>
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="mySwiper"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-between"
                            >
                                <p className="text-gray-600 text-lg mb-6 italic">"{review.quote}"</p>
                                <div className="flex items-center">
                                    <img src={review.avatar} alt="Avatar" className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-md" />
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">{review.name}</p>
                                        <p className="text-gray-500">{review.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Review;