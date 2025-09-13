import React from 'react';
import bgImg from '../../assets/img1.jpg';

const Newsletter: React.FC = () => {
  return (
    <section 
      className="relative py-20 px-4" 
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div 
        className="absolute inset-x-0 top-0 h-6"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent 0 5px, #ffffff 5px 10px)`,
          backgroundSize: '16px 16px',
          backgroundPosition: 'left top',
        }}
      ></div>
      
      {/* Newsletter Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 font-light italic text-white">
          Newsletter
        </h2>
        
        <p className="max-w-3xl mb-8 leading-relaxed text-sm sm:text-base text-white opacity-80">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.
        </p>
        
        <div className="w-full max-w-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full py-3 px-4 text-gray-800 bg-[#e3e6eb] border border-[#292D35] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-300 placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto py-3 px-6 bg-[#7C5228] text-white font-semibold rounded-md hover:bg-[#553329] transition duration-300 flex items-center justify-center space-x-2"
          >
            <span>Submit</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 transform -rotate-45"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.945A.75.75 0 007.5 12.186v.294c0 .592.548 1.054 1.157.962L18.432 10.96a.75.75 0 00.94-.926l-7.945-2.432a.75.75 0 00-.73-.554L6.96 5.516z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;