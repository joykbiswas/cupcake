import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Clock, Phone } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { GRADIENTS, COLORS } from '../../../constants/colors';

const Contact: React.FC = () => {
  return (
    <div className="py-20" style={{ background: GRADIENTS.BRAND_SECTION }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: COLORS.TEXT_PRIMARY }}>Visit Us Today!</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: COLORS.TEXT_SECONDARY }}>Come experience the magic of Cup Cake. We'd love to make your day a little sweeter!</p>
        </div>
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E8E0D0' }}>
              <MapPin className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>Location</h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>123 Sweet Street<br />Bakery District, BD 12345</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E8E0D0' }}>
              <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>Hours</h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>Mon-Sat: 7AM - 8PM<br />Sunday: 9AM - 6PM</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E8E0D0' }}>
              <Phone className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>Contact</h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>+880-123-456-789<br />hello@cupcake.com</p>
            </div>
          </div>
        </AnimatedSection>
        <div className="flex justify-center space-x-6 mt-12">
          <a href="#" className="p-4 rounded-full transition-colors duration-300 border" style={{ borderColor: '#E8E0D0' }}>
            <Facebook className="w-6 h-6" style={{ color: COLORS.TEXT_PRIMARY }} />
          </a>
          <a href="#" className="p-4 rounded-full transition-colors duration-300 border" style={{ borderColor: '#E8E0D0' }}>
            <Instagram className="w-6 h-6" style={{ color: COLORS.TEXT_PRIMARY }} />
          </a>
          <a href="#" className="p-4 rounded-full transition-colors duration-300 border" style={{ borderColor: '#E8E0D0' }}>
            <Twitter className="w-6 h-6" style={{ color: COLORS.TEXT_PRIMARY }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;


