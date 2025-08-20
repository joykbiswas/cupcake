import React from 'react';
import { Award, Clock, ChefHat, Cake } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { GRADIENTS, COLORS } from '../../../constants/colors';

const stats = [
  { icon: Cake, number: '10,000+', label: 'Happy Customers' },
  { icon: Award, number: '50+', label: 'Awards Won' },
  { icon: Clock, number: '8+', label: 'Years Experience' },
  { icon: ChefHat, number: '25+', label: 'Unique Flavors' },
];

const Stats: React.FC = () => {
  return (
    <AnimatedSection delay={400}>
      <div className="py-16" style={{ background: GRADIENTS.BRAND_SECTION }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#7C5228]/10">
                  <stat.icon className="w-8 h-8 text-[#7C5228]" />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>{stat.number}</div>
                <div className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Stats;


