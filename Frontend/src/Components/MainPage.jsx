import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Users, Award, Sparkles, Feather } from 'lucide-react';
import bgimg from '../schoolassets/bghd.png'

export default function MainPage() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const rotatingWords = ['Excellence', 'Innovation', 'Character', 'Leadership', 'Success'];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  const highlights = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Quality Education',
      description: 'Comprehensive curriculum designed for holistic development'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Faculty',
      description: 'Dedicated teachers committed to student success'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Outstanding Results',
      description: 'Proven track record of academic excellence'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Modern Facilities',
      description: 'State-of-the-art infrastructure for optimal learning'
    }
  ];

  return (
    <div id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      >
        <div className="absolute inset-0 opacity-70 bg-gradient-to-r from-indigo-900/95 via-purple-900/90 to-indigo-800/85"></div>
        
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-white space-y-6 md:space-y-8">
              
              <div className="space-y-6">
                {/* Welcome Badge */}
                <div className="inline-block max-w-full">
                  <div className="bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold backdrop-blur-sm border border-yellow-400/30 leading-relaxed whitespace-normal">
                    Welcome to Corporation Higher Secondary School
                  </div>
                </div>

                {/* --- FIXED: THIRUKKURAL SECTION --- */}
                {/* Changes made:
                    1. padding reduced to p-3 for mobile
                    2. gap reduced to gap-2
                    3. font size reduced to text-sm for mobile
                    4. whitespace-nowrap added to force 1 line per span
                    5. overflow-x-auto added just in case screen is extremely small
                */}
                <div className="bg-white/10 backdrop-blur-md border-l-4 border-yellow-400 p-3 sm:p-4 rounded-r-xl max-w-xl hover:bg-white/15 transition-colors duration-300">
                  <div className="flex gap-2 sm:gap-3">
                    <Feather className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div className="overflow-hidden">
                      <div className="text-sm sm:text-xl md:text-2xl font-bold text-yellow-50 leading-snug font-serif tracking-tight">
                        <span className="block whitespace-nowrap">கற்க கசடறக் கற்பவை கற்றபின்</span>
                        <span className="block mt-0.5 whitespace-nowrap">நிற்க அதற்குத் தக.</span>
                      </div>
                      <p className="text-gray-300 text-[10px] sm:text-sm italic mt-1.5">
                        - திருக்குறள் (391)
                      </p>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  Where Dreams
                  <br />
                  Meet{' '}
                  <span className="relative inline-block">
                    <span 
                      className={`text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 transition-opacity duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {rotatingWords[currentWord]}
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"></span>
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl">
                  Nurturing young minds with excellence in education, character building, 
                  and creating future leaders who make a difference in the world.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#admission-process"
                  className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#about"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-yellow-300">28+</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1">Years Legacy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-pink-300">288</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-purple-300">98%</div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="text-yellow-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}