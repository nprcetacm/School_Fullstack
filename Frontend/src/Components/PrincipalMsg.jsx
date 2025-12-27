import { useState } from 'react';
import { Quote, Award, Heart, Lightbulb, Users, Target } from 'lucide-react';
import principal from '../schoolassets/Principal-Pic.jpg'

export default function PrincipalMsg() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 mt-15 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-700 text-white px-6 py-2 rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Leadership Message</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Message from the Headmaster
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Side - Principal Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {/* Image Container with Decorative Frame */}
              <div className="relative">
                {/* Decorative Corner Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-emerald-600 rounded-tl-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-teal-600 rounded-br-3xl"></div>
                
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src={principal} 
                    alt="Headmaster"
                    className="w-full h-auto object-cover"
                  />
                  {/* Gradient Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white text-2xl font-bold">Mr. H. Subramaniakumar</h3>
                    <p className="text-emerald-200 text-sm font-medium">Headmaster</p>
                  </div>
                </div>

                {/* Quote Icon Decoration */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-600 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Credentials Card */}
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-600">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Key Focus Areas
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Holistic Student Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Inclusive Education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Skill Based Learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Community Engagement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Message Content */}
          <div className="lg:col-span-3">
            
            {/* Opening Quote */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
              <Quote className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-xl lg:text-2xl font-semibold italic leading-relaxed">
                "We strongly believe that economic challenges should never stand in the way of education and success."
              </p>
            </div>

            {/* Message Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              
              {/* Greeting */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Our School Website</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  It is my privilege to welcome you to the official website of <strong>Corporation Higher Secondary School, Sundararajapuram, Madurai</strong>. 
                  Our school has always been a place of hope and opportunity, especially for students coming from economically weaker backgrounds.
                </p>
              </div>

              {/* Initial Paragraphs */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our dedicated teachers and staff work tirelessly to support every student—academically, emotionally, and socially. 
                  We strive to ensure that all children, regardless of their family circumstances, receive equal access to quality education, 
                  nutritious meals, skill development opportunities, and a safe learning environment.
                </p>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="space-y-6 animate-fadeIn">
                    <p>
                      We encourage our students to dream big, work hard, and believe in their abilities. Many of our students have achieved 
                      great heights in academics, sports, arts, and various professions, proving that determination and guidance can overcome any barrier.
                    </p>

                    <p>
                      Through this website, we aim to keep parents and the community informed about our activities, achievements, and 
                      initiatives designed to uplift every child. Together, let us continue to build a future where every student—especially 
                      those from economically disadvantaged families—finds strength, dignity, and success through education.
                    </p>

                    {/* Tamil Translation Section */}
                    <div className="mt-8 pt-8 border-t-2 border-emerald-100">
                        <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
                            தமிழ் செய்தி
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">தலைமை ஆசிரியர் செய்தி</h3>
                        
                        <div className="space-y-4 text-gray-700 font-tamil leading-relaxed">
                            <p>
                                மதுரை, சுந்தரராஜபுரத்தில் உள்ள கார்ப்பரேஷன் மேல்நிலைப் பள்ளியின் இணையதளத்திற்கு உங்களை வரவேற்கிறதில் பெரும் மகிழ்ச்சி அடைகிறேன். 
                                பொருளாதார ரீதியாக பின்தங்கிய குடும்பங்களில் இருந்து வரும் மாணவர்களுக்கு கல்வி ஒரு வாய்ப்பாக மட்டுமல்ல, ஒரு மாற்றத்தின் சக்தியாக எங்கள் பள்ளி திகழ்கிறது.
                            </p>
                            <p>
                                எங்கள் ஆசிரியர்கள் மற்றும் பணியாளர்கள் ஒவ்வொரு மாணவருக்கும் தேவையான கல்வி, வழிகாட்டுதல், உணவு, திறன் வளர்ச்சி, மற்றும் பாதுகாப்பான சூழலை வழங்க tireless-ஆக உழைக்கின்றனர். 
                                குடும்ப நிலைமை கல்விக்கு தடையாக இருக்கக்கூடாது என்பதே எங்கள் பள்ளியின் அடிப்படை நெறி.
                            </p>
                            <p>
                                எங்கள் மாணவர்கள் தங்கள் கனவுகளை விடாமல் பின்தொடரவும், தங்களின் திறனை நம்பவும் ஊக்குவிக்கிறோம். பொருளாதார சவால்களை கடந்து உயர்ந்த நிலைகளில் சாதித்து வரும் 
                                எங்கள் பழைய மாணவர்கள் அனைவருக்கும் ஒரு பேருதாரணம்.
                            </p>
                            <p>
                                இந்த இணையதளம் மூலம் பள்ளியின் நிகழ்வுகள், மாணவர் சாதனைகள், மற்றும் மாணவர்கள் முன்னேற்றத்தை நோக்கி எடுக்கப்படும் நடவடிக்கைகள் அனைத்தும் பெற்றோர்களுக்கும் 
                                சமூகத்துக்கும் எளிதில் கிடைக்கப்படுகின்றன.
                            </p>
                            <p className="font-semibold text-emerald-800">
                                பொருளாதாரத்தில் பின்தங்கிய குடும்பங்களில் இருந்து வரும் ஒவ்வொரு குழந்தைக்கும் கல்வி மூலம் தன்னம்பிக்கை, மரியாதை, மற்றும் வெற்றியை உருவாக்குவது எங்கள் கூட்டுப்பணியாகும்.
                            </p>
                        </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Read More Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-700 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isExpanded ? 'Read Less' : 'Read Full Message / முழு செய்தி'}
                  <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              </div>

              {/* Closing & Signature */}
              <div className="border-t-2 border-gray-200 pt-6 mt-8">
                <div className="space-y-2">
                  <p className="text-gray-800 font-semibold">Warm regards / அன்புடன்,</p>
                  <p className="text-2xl font-bold text-gray-900 italic">Mr. H. Subramaniakumar</p>
                  <p className="text-gray-600">Headmaster / தலைமை ஆசிரியர்</p>
                  <p className="text-sm text-gray-500">Corporation Higher Secondary School<br/>Sundararajapuram, Madurai</p>
                </div>
              </div>
            </div>

            {/* Contact Call-to-Action */}
            <div className="mt-8 bg-gradient-to-br from-emerald-700 to-teal-600 rounded-2xl p-6 text-white text-center">
              <p className="text-lg mb-4">
                Have questions? Reach out to us.
              </p>
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                Contact Office
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}