
import Food1 from "../../assets/cake2.png";
import Food2 from "../../assets/cake3.png";
import Food3 from "../../assets/cake4.png";
import { motion } from 'framer-motion';
import { SlideUp } from '../Hero/Hero';


const MenuData = [
    {
        id: 1,
        name: "vangogh",
        img: Food1,
        price: "$5.99",
        delay: 0.4,
    },
    {
        id: 2,
        name: "Sea",
        img: Food2,
        price: "$4.99",
        delay: 0.8,
    },
    {
        id: 3,
        name: "Lemon",
        img: Food3,
        price: "$6.99",
        delay: 1.2,
    },
];

const Menu = () => {
    return (
        <section className="bg-orange-200">
            <div className='max-w-screen-2xl mx-auto p-12 py-12'>
                <motion.h3 
                variants={SlideUp(0)}
                initial="hidden"
                whileInView="show"
                className='text-2xl font-semibold
                text-secondary uppercase py-8'>Our Menu</motion.h3>
                {/* grid section  */}
                <div className='grid grid-cols-1 sm:grid-cols-2
                md:grid-cols-3 gap-6'>
                    {MenuData.map((item) => {
                        return(
                            <div className='group bg-[#854101] text-white shadow-md p-3 flex items-center gap-3 rounded-xl'>
                                <img src={item.img} alt="" className='w-24 
                                img-shadow group-hover:scale-125 transition-all
                                duration-700 '/>
                                <div>
                                <h3 className='text-xl font-semibold'>{item.name}</h3>
                                <p className='text-xl text-primary'>{item.price}</p>
                                </div>
                            </div>
                        )
                    })}
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