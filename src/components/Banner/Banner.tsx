import CakePng from "../../assets/cake.png";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export const SlideUp = (delay: number) => {
  return {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: delay,
      },
    },
  };
};

const Banner = () => {
  return (
    <main className="max-w-screen-2xl mx-auto overflow-hidden">
      <div className="bg-lime-100  min-h-[600px] flex justify-center relative z-10 overflow-hidden">
        <div
          className="grid grid-cols-1 md:grid-cols-2
                gap-12 lg:gap-24 place-items-center justify-between"
        >
          {/* text content hero  */}
          <div
            className="space-y-3 mt--14 text-center
                    md:text-left md:mt-0"
          >
            <motion.h1
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="show"
              className="relative text-5xl lg:text-7xl
                        xl:text-8xl font-bold uppercase text-outline
                        "
            >
              Yummy
            </motion.h1>
            <motion.h1
              variants={SlideUp(1)}
              initial="hidden"
              whileInView="show"
              className="text-5xl lg:text-7xl xl:text-8xl
                        font-bold uppercase"
            >
              Cake
            </motion.h1>
            <motion.p
              variants={SlideUp(1.5)}
              initial="hidden"
              whileInView="show"
              className="text-sm"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non.
            </motion.p>
            <motion.button
              variants={SlideUp(2)}
              initial="hidden"
              whileInView="show"
              className="btn-primary inline-block !mt-10"
            >
              <IoCartOutline className="inline mr-2" />
              Order Now
            </motion.button>
          </div>
          {/* img hero  */}
          <div className="relative border-2 border-red-400">
            <motion.img
              initial={{ opacity: 0, rotate: 20, x: 200, y: 100 }}
              whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              src={CakePng}
              alt=""
              className="w-[450px] img-shadow"
            />
          </div>
        </div>
      </div>
      {/* Background blue  */}
      <motion.div
        initial={{ opacity: 0, rotate: 60, x: 200, y: 100 }}
        whileInView={{ opacity: 1, rotate: 40, x: 0, y: 0 }}
        className="w-[600px] h-[600px] rounded-3xl
            bg-blue-600 absolute top-[40%] right-[-10%] z-20"
      ></motion.div>
    </main>
  );
};

export default Banner;
