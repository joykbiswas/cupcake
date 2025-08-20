import React from 'react';
import AnimatedSection from './AnimatedSection';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Head Baker & Founder',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    description: 'With 15 years of baking experience, Sarah founded Cup Cake with a dream to bring joy through sweet treats.',
  },
  {
    name: 'Mike Chen',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    description: "Mike's creative flair and technical expertise help us create our most innovative flavor combinations.",
  },
  {
    name: 'Emma Davis',
    role: 'Cake Designer',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    description: 'Emma transforms our cupcakes into edible art pieces, making every celebration extra special.',
  },
];

const Team: React.FC = () => {
  return (
    <AnimatedSection delay={800}>
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Meet Our Sweet Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The talented people behind every delicious cupcake</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Team;


