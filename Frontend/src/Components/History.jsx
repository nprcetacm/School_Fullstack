import { useState } from 'react';
import { Clock, Eye, Target, ChevronRight } from 'lucide-react';
import stoneimg from '../schoolassets/SchoolStonework.png'

export default function History() {
  const [activeSection, setActiveSection] = useState('history');

  const sections = [
    { id: 'history', label: 'Our History', icon: <Clock className="w-6 h-6" /> },
    { id: 'vision', label: 'Our Vision', icon: <Eye className="w-6 h-6" /> },
    { id: 'mission', label: 'Our Mission', icon: <Target className="w-6 h-6" /> }
  ];

 // Stone Work Component
  const StoneWork = () => (
    <div className="relative group">
      {/* Stone Memorial Image Container */}
      <div className="relative overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
        <img 
          src={stoneimg}
          alt="Foundation Stone Memorial"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40 rounded-lg transform translate-y-4 translate-x-4 -z-10 blur-md"></div>
      
      {/* Decorative Corner Accents */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  // History Content
  const HistoryContent = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Rich Heritage</h3>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Established in <strong>1975-1976</strong>, our institution has been a beacon of educational excellence 
              in Madurai for nearly five decades. What began as a small school has grown into a comprehensive 
              educational institution serving thousands of students.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg my-4">
              <h4 className="font-bold text-gray-900 mb-2">Milestones in Our Journey:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>1975-1976:</strong> Foundation as Primary School</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>1997-1998:</strong> Upgraded to Middle School</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>1997-1998:</strong> Elevated to High School</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>2001-2002:</strong> Expanded to Higher Secondary School</span>
                </li>
              </ul>
            </div>

            <p>
              Under the administration of the Madurai Municipal Corporation, we have continuously evolved 
              to meet the changing educational needs of our community. Our commitment to quality education 
              has remained unwavering throughout the decades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Vision Content (Updated)
  const VisionContent = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
          <Eye className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          
          <div className="space-y-6">
            {/* English Vision */}
            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 shadow-sm">
              <p className="text-xl text-purple-900 font-medium leading-relaxed">
                "To create an inclusive and empowering learning environment where every student, 
                regardless of economic background, can achieve academic excellence, personal growth, 
                and lifelong success."
              </p>
            </div>

            {/* Tamil Vision */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="text-purple-700 font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                எங்கள் பார்வை
              </h4>
              <p className="text-gray-700 text-lg leading-relaxed font-tamil">
                "பொருளாதாரப் பின்னணியைப் பொருட்படுத்தாமல், ஒவ்வொரு மாணவரும் கல்விசார் சிறப்பையும், 
                தனிப்பட்ட வளர்ச்சியையும், வாழ்நாள் முழுவதும் நீடிக்கும் வெற்றியையும் அடையக்கூடிய, 
                அனைவரையும் உள்ளடக்கிய மற்றும் அதிகாரமளிக்கும் கற்றல் சூழலை உருவாக்குதல்."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mission Content (Updated)
  const MissionContent = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
          <Target className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          
          <div className="space-y-8">
            {/* English Mission Points */}
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm hover:translate-x-1 transition-transform">
                <p className="text-gray-800">Provide equitable access to quality education for all students.</p>
              </div>
              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm hover:translate-x-1 transition-transform">
                <p className="text-gray-800">Support holistic development—academic, emotional, social, and physical.</p>
              </div>
              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm hover:translate-x-1 transition-transform">
                <p className="text-gray-800">Offer skill-building opportunities and resources for personal and professional growth.</p>
              </div>
              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm hover:translate-x-1 transition-transform">
                <p className="text-gray-800">Foster a safe, nurturing, and motivating environment that encourages students to dream big and realize their potential.</p>
              </div>
              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm hover:translate-x-1 transition-transform">
                <p className="text-gray-800">Engage parents and the community to strengthen education and student well-being.</p>
              </div>
            </div>

            {/* Tamil Mission Section */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h4 className="text-green-800 font-bold mb-4 text-lg border-b border-green-200 pb-2">
                எங்கள் பணி
              </h4>
              <ul className="space-y-3 text-gray-700 font-tamil">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>அனைத்து மாணவர்களுக்கும் தரமான கல்விக்கான சமமான அணுகலை வழங்குதல்.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>கல்வி, உணர்ச்சி, சமூக மற்றும் உடல் ரீதியான முழுமையான வளர்ச்சிக்கு ஆதரவளித்தல்.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>தனிப்பட்ட மற்றும் தொழில்முறை வளர்ச்சிக்கான திறன் மேம்பாட்டு வாய்ப்புகளையும் வளங்களையும் வழங்குதல்.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>மாணவர்கள் பெரிய கனவுகளைக் காணவும், தங்கள் திறனை உணர்ந்து கொள்ளவும் ஊக்குவிக்கும் ஒரு பாதுகாப்பான, ஆதரவான மற்றும் ஊக்கமளிக்கும் சூழலை வளர்த்தல்.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">•</span>
                  <span>கல்வியையும் மாணவர்களின் நல்வாழ்வையும் வலுப்படுத்த பெற்றோர்களையும் சமூகத்தையும் ஈடுபடுத்துதல்.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="history" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Foundation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding our past, embracing our vision, and pursuing our mission
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Side - Stone Memorial */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Foundation Stone
              </h2>
              <StoneWork />
            </div>
          </div>

          {/* Right Side - Content Tabs */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-3 mb-8 border-b-2 border-gray-200 pb-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg -mb-4'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 min-h-[600px]">
              {activeSection === 'history' && <HistoryContent />}
              {activeSection === 'vision' && <VisionContent />}
              {activeSection === 'mission' && <MissionContent />}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}