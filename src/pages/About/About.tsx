import React from 'react';
import { Hero, Story, Stats, Values, Team, Testimonials, Contact } from './components';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Hero />
      <Story />
      <Stats />
      <Values />
      <Team />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default AboutPage;