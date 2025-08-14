import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import cakeVideo from "../../assets/cake video.mp4";
import bgVideo from "../../assets/cake make.mp4";

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

const Hero = () => {
  return (
    <main className="max-w-screen-2xl mx-auto overflow-hidden">
      <div className="min-h-screen flex justify-between relative z-10 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        
        {/* Opacity Overlay */}
        <div className="absolute inset-0 bg-[#572a01] opacity-60"></div>
        
        {/* Content */}
        <div className="pt-14 w-full flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-16 gap-8 md:gap-0 relative z-20">
          {/* text content hero - Left side */}
          <div className="text-white w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
            <motion.h1
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView="show"
              className="relative text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold uppercase text-transparent"
              style={{ WebkitTextStroke: '3px rgb(246, 245, 246)' }}
            >
              Yummy
            </motion.h1>
            <motion.h1
              variants={SlideUp(1)}
              initial="hidden"
              whileInView="show"
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl
                        font-bold uppercase"
            >
              Cake
            </motion.h1>
            <motion.p
              variants={SlideUp(1.5)}
              initial="hidden"
              whileInView="show"
              className="text-base sm:text-lg max-w-md mx-auto md:mx-0"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, non.
            </motion.p>
            <motion.button
              variants={SlideUp(2)}
              initial="hidden"
              whileInView="show"
              className="bg-[#3d1816b3] p-3 rounded-4xl inline-block"
            >
              <IoCartOutline className="inline mr-2" />
              Order Now
            </motion.button>
          </div>
          
          {/* Video hero - Right side */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end ">
            <motion.video
              initial={{ opacity: 0, rotate: 20, x: 200, y: 100 }}
              whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              src={cakeVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-[600px] object-cover img-shadow rounded-b-full "
            />
          </div>
        </div>
      </div>
      {/* Background blue  */}
      {/* <motion.div
        initial={{ opacity: 0, rotate: 60, x: 200, y: 100 }}
        whileInView={{ opacity: 1, rotate: 40, x: 0, y: 0 }}
        className="w-[600px] h-[600px] rounded-3xl
            bg-blue-600 absolute top-[40%] right-[-10%] z-20"
      ></motion.div> */}
    </main>
  );
};

export default Hero;
