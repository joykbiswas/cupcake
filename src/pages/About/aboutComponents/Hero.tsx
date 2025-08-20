import React from 'react';
import { Cake, Star, Award, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { GRADIENTS } from '../../../constants/colors';

const Hero: React.FC = () => {
  return (
    <AnimatedSection>
      <div
        className="relative overflow-hidden"
        style={{ background: GRADIENTS.BRAND_HERO }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Cake className="w-12 h-12 text-pink-300" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Cup Cake
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">Sweetening Lives Since 2016</h2>
              <p className="text-lg leading-relaxed text-white/90">
                Welcome to Cup Cake, where every bite is a moment of pure joy. We're passionate about creating
                the most delicious, beautiful cupcakes that make your special occasions even more memorable.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full text-[#553329]">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full text-[#553329]">
                  <Award className="w-5 h-5 text-[#7C5228]" />
                  <span className="font-semibold">Award Winning</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop"
                alt="Beautiful cupcakes"
                className="relative rounded-3xl shadow-2xl w-full h-80 md:h-96 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Made with Love</p>
                    <p className="text-sm text-gray-600">Fresh Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Hero;


