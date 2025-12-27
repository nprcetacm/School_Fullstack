import { useState } from 'react';
import { Heart, Target, Eye, Award, Users, BookOpen, Lightbulb, Globe } from 'lucide-react';
import img1 from '../schoolassets/scho-img3.png'
import img2 from '../schoolassets/lab1.jpg'
import img5 from '../schoolassets/scho-img1.png'
import img6 from '../schoolassets/scho-img2.png'
// Importing new images
import imgScience1 from '../schoolassets/science_lab.jpg'
import imgScience2 from '../schoolassets/science_lab2.jpg'

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: <Target className="w-5 h-5" /> },
    { id: 'vision', label: 'Our Vision', icon: <Eye className="w-5 h-5" /> },
    { id: 'values', label: 'Core Values', icon: <Heart className="w-5 h-5" /> }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from academics to character development.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Building strong relationships and fostering a supportive environment for all members.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Learning',
      description: 'Promoting lifelong learning and curiosity in every student through innovative teaching.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Embracing new ideas and technologies to prepare students for a dynamic future.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Upholding honesty, responsibility, and ethical behavior in all our interactions.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Citizenship',
      description: 'Developing awareness and respect for diverse cultures and global perspectives.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            About Our School
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Building Tomorrow's Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over two decades, we've been committed to providing exceptional education 
            that nurtures both minds and hearts, preparing students for a bright future.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left Side - Image Collage (Updated for 6 Images) */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="h-40 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={img1} 
                    alt="Students learning"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-56 bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={img2} 
                    alt="School activities"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* New Image 1 */}
                <div className="h-40 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={imgScience1} 
                    alt="Science Lab"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 pt-8">
                <div className="h-56 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={img5} 
                    alt="Classroom"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={img6} 
                    alt="Students success"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* New Image 2 */}
                <div className="h-56 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={imgScience2} 
                    alt="Science Lab 2"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border-4 border-yellow-400 z-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">28+</div>
                <div className="text-sm text-gray-600 font-medium">Years Legacy</div>
              </div>
            </div>
          </div>

          {/* Right Side - Tabs Content */}
          <div className="sticky top-24">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-auto min-h-[500px]">
              {activeTab === 'mission' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-indigo-600" />
                    </div>
                    Our Mission
                  </h3>
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 text-lg leading-relaxed">
                        <li>Provide equitable access to quality education for all students.</li>
                        <li>Support holistic development—academic, emotional, social, and physical.</li>
                        <li>Offer skill-building opportunities and resources for personal and professional growth.</li>
                        <li>Foster a safe, nurturing, and motivating environment that encourages students to dream big and realize their potential.</li>
                        <li>Engage parents and the community to strengthen education and student well-being.</li>
                    </ul>
                    
                    {/* Tamil Translation */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-indigo-600 mb-2">எங்கள் பணி</h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed font-tamil">
                            <li>அனைத்து மாணவர்களுக்கும் தரமான கல்விக்கான சமமான அணுகலை வழங்குதல்.</li>
                            <li>கல்வி, உணர்ச்சி, சமூக மற்றும் உடல் ரீதியான முழுமையான வளர்ச்சிக்கு ஆதரவளித்தல்.</li>
                            <li>தனிப்பட்ட மற்றும் தொழில்முறை வளர்ச்சிக்கான திறன் மேம்பாட்டு வாய்ப்புகளையும் வளங்களையும் வழங்குதல்.</li>
                            <li>மாணவர்கள் பெரிய கனவுகளைக் காணவும், தங்கள் திறனை உணர்ந்து கொள்ளவும் ஊக்குவிக்கும் ஒரு பாதுகாப்பான, ஆதரவான மற்றும் ஊக்கமளிக்கும் சூழலை வளர்த்தல்.</li>
                            <li>கல்வியையும் மாணவர்களின் நல்வாழ்வையும் வலுப்படுத்த பெற்றோர்களையும் சமூகத்தையும் ஈடுபடுத்துதல்.</li>
                        </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    Our Vision
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed text-lg">
                        To create an inclusive and empowering learning environment where every student, regardless of economic background, can achieve academic excellence, personal growth, and lifelong success.
                    </p>
                    
                    {/* Tamil Translation */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-purple-600 mb-2">எங்கள் பார்வை</h4>
                        <p className="text-gray-600 leading-relaxed font-tamil">
                            பொருளாதாரப் பின்னணியைப் பொருட்படுத்தாமல், ஒவ்வொரு மாணவரும் கல்விசார் சிறப்பையும், தனிப்பட்ட வளர்ச்சியையும், வாழ்நாள் முழுவதும் நீடிக்கும் வெற்றியையும் அடையக்கூடிய, அனைவரையும் உள்ளடக்கிய மற்றும் அதிகாரமளிக்கும் கற்றல் சூழலை உருவாக்குதல்.
                        </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6">
                    Core Values
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {values.slice(0, 4).map((value, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                        <div className="text-indigo-600 flex-shrink-0">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{value.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}