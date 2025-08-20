import React from 'react';
import { Heart, CheckCircle, Users, Sparkles } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { GRADIENTS } from '../../../constants/colors';

const values = [
  { icon: Heart, title: 'Made with Love', description: 'Every cupcake is crafted with passion and attention to detail, using only the finest ingredients.' },
  { icon: CheckCircle, title: 'Quality First', description: 'We never compromise on quality. From sourcing to baking, excellence is our standard.' },
  { icon: Users, title: 'Community Focused', description: "We're proud to be part of this community, celebrating life's sweet moments together." },
  { icon: Sparkles, title: 'Always Fresh', description: 'Our cupcakes are baked fresh daily to ensure you get the perfect taste every time.' },
];

const Values: React.FC = () => {
  return (
    <AnimatedSection delay={600}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Makes Us Special</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our core values guide everything we do, from selecting ingredients to serving our customers
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: GRADIENTS.BRAND_ACCENT }}
                >
                  <value.icon className="w-8 h-8 text-pink-600 group-hover:text-purple-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Values;


