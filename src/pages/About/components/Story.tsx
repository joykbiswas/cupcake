import React from 'react';
import { Sparkles, Heart, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { GRADIENTS } from '../../../constants/colors';
import bakingImg from '../../../assets/cake3.png';

const Story: React.FC = () => {
  return (
    <AnimatedSection delay={200}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Sweet Story</h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: GRADIENTS.BRAND_ACCENT }}
          ></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full shrink-0">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">The Beginning</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cup Cake was born from a simple dream - to create the perfect cupcake that would bring
                    smiles to people's faces. What started as a small home bakery has grown into a beloved
                    local institution, but our commitment to quality and love remains unchanged.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We believe that life's sweetest moments deserve the finest treats. Our mission is to create
                    not just cupcakes, but edible memories that celebrate life's special occasions, big and small.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={bakingImg}
                alt="Baking process"
                className="rounded-2xl shadow-lg object-cover h-64 w-full transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=500&fit=crop&auto=format&q=80"
                alt="Decorated cupcakes"
                className="rounded-2xl shadow-lg object-cover h-64 w-full mt-8 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl px-6 py-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-800">Fresh Every Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Story;


