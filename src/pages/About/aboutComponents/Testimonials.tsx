import React, { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    name: 'Jennifer Miller',
    text: 'Cup Cake made our wedding day absolutely perfect! The cupcakes were not only beautiful but incredibly delicious.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
  },
  {
    name: 'Robert Wilson',
    text: 'Best cupcakes in town! My kids always ask for Cup Cake treats for their birthday parties.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
  },
  {
    name: 'Lisa Thompson',
    text: "The attention to detail and quality of ingredients really shows. These are not just cupcakes, they're little pieces of happiness!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
  },
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection delay={1000}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Don't just take our word for it - hear from our happy customers</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
            <div className="relative text-center">
              <Quote className="w-12 h-12 text-pink-400 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 italic">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-16 h-16 rounded-full object-cover border-4 border-pink-200" />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                  <div className="flex space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentTestimonial ? 'bg-pink-600' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Testimonials;


