import React, { useState, useEffect } from 'react';
import { 
  Landmark, Youtube, BookOpen, GraduationCap, Library as LibraryIcon, 
  Book, FileText, MonitorPlay, Languages, Newspaper, 
  Cpu, Briefcase, Map, ExternalLink, Search, Globe, Sparkles, ArrowRight 
} from 'lucide-react';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const resources = [
    {
      id: 1,
      category: "Government Resources",
      icon: <Landmark className="w-6 h-6 text-white" />,
      gradient: "from-blue-600 to-blue-400",
      description: "Official portals for education departments and social welfare.",
      links: [
        { name: "Dept. of School Education – TN", url: "https://tnschools.gov.in/welcome" },
        { name: "Government of Tamil Nadu", url: "https://www.tn.gov.in/index.php" },
        { name: "TN Govt – Department List", url: "https://www.tn.gov.in/department_list.php" },
        { name: "Social Welfare Dept", url: "https://www.tnsocialwelfare.tn.gov.in/en" },
        { name: "Ministry of Education India", url: "https://www.education.gov.in/en" }
      ]
    },
    {
      id: 2,
      category: "Digital Learning Channels",
      icon: <Youtube className="w-6 h-6 text-white" />,
      gradient: "from-red-600 to-red-400",
      description: "Video lessons and official educational channels.",
      links: [
        { name: "Kalvi Tholaikkatchi TV", url: "https://www.youtube.com/channel/UCMJpX8Yd0E5fD4xG-t8k5wA" },
        { name: "TN School Education Official", url: "https://www.youtube.com/@tnschoolsofficial/videos" }
      ]
    },
    {
      id: 3,
      category: "Textbooks & Curriculum",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      gradient: "from-emerald-600 to-emerald-400",
      description: "Access and download current syllabus textbooks.",
      links: [
        { name: "TN School Textbooks", url: "https://www.tntextbooks.in/p/school-books.html" },
        { name: "Textbooks Mirror Site", url: "https://www.tntextbooks.net/" }
      ]
    },
    {
      id: 4,
      category: "Scholarships & Loans",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      gradient: "from-purple-600 to-purple-400",
      description: "Financial aid information and application portals.",
      links: [
        { name: "TN Scholarships Portal", url: "https://tndce.tn.gov.in/Home/scholarship" },
        { name: "Central Gov Schemes", url: "https://www.education.gov.in/en" }
      ]
    },
    {
      id: 5,
      category: "Digital Libraries",
      icon: <LibraryIcon className="w-6 h-6 text-white" />,
      gradient: "from-indigo-600 to-indigo-400",
      description: "Vast collections of digitized books and literature.",
      links: [
        { name: "National Digital Library", url: "https://www.ndl.gov.in/" },
        { name: "Tamil Digital Library", url: "https://tamildigitallibrary.in/" },
        { name: "Project Madurai", url: "https://www.projectmadurai.org/pmworks.html" }
      ]
    },
    {
      id: 6,
      category: "Free E-Books",
      icon: <Book className="w-6 h-6 text-white" />,
      gradient: "from-amber-600 to-amber-400",
      description: "Open source platforms for reading and research.",
      links: [
        { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
        { name: "Delhi University eBooks", url: "https://csl.du.ac.in/Free_ebooks.htm" },
        { name: "Dir. Open Access Books", url: "https://www.doabooks.org/doab" },
        { name: "E-Books Directory", url: "https://www.e-booksdirectory.com/" }
      ]
    },
    {
      id: 7,
      category: "Journals & Research",
      icon: <FileText className="w-6 h-6 text-white" />,
      gradient: "from-cyan-600 to-cyan-400",
      description: "Academic papers and research publications.",
      links: [
        { name: "Open Access E-Journals", url: "https://www.kalaignarcentenarylibrary.org/p/open-access-e-journals.html" }
      ]
    },
    {
      id: 8,
      category: "Online Courses (MOOCs)",
      icon: <MonitorPlay className="w-6 h-6 text-white" />,
      gradient: "from-orange-600 to-orange-400",
      description: "Certification courses from top institutions.",
      links: [
        { name: "SWAYAM Portal", url: "https://swayam.gov.in/" },
        { name: "NPTEL Courses", url: "https://nptel.ac.in/" }
      ]
    },
    {
      id: 9,
      category: "Language Tools",
      icon: <Languages className="w-6 h-6 text-white" />,
      gradient: "from-teal-600 to-teal-400",
      description: "Translation and dictionary services.",
      links: [
        { name: "Online Dictionary", url: "https://www.thefreedictionary.com/" },
        { name: "Google Translate", url: "https://translate.google.com/" }
      ]
    },
    {
      id: 10,
      category: "Magazines & News",
      icon: <Newspaper className="w-6 h-6 text-white" />,
      gradient: "from-pink-600 to-pink-400",
      description: "Current affairs and educational magazines.",
      links: [
        { name: "TN School Magazines", url: "https://tnschools.gov.in/magazine-page" },
        // Added Magzter here
        { name: "Magzter (Digital Magazines)", url: "https://www.magzter.com/" },
        { name: "E-Newspapers (KCL)", url: "https://www.kalaignarcentenarylibrary.org/p/e-resources-newspapers.html" }
      ]
    },
    {
      id: 11,
      category: "Tech & Innovation",
      icon: <Cpu className="w-6 h-6 text-white" />,
      gradient: "from-violet-600 to-violet-400",
      description: "AI tools, tech news, and coding resources.",
      links: [
        { name: "ACM Digital Library", url: "https://dl.acm.org/" },
        { name: "ACM Tech News", url: "https://technews.acm.org/" },
        { name: "NPRCET ACM Chapter", url: "https://nprcet.acm.org/" },
        { name: "Free AI Tools Directory", url: "https://nprcet.acm.org/ai" },
        { name: "Technology Playground", url: "https://nprcet.acm.org/technologyplayground" }
      ]
    },
    {
      id: 12,
      category: "Career & Jobs",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      gradient: "from-slate-600 to-slate-400",
      description: "Employment news and career guidance.",
      links: [
        { name: "Job News (Jagran Josh)", url: "https://www.jagranjosh.com/employment-news-st-1348730577" },
        { name: "TN Career Services", url: "https://tamilnaducareerservices.tn.gov.in/vle/vle_home" },
        { name: "TN Employment Exchange", url: "https://tnvelaivaaippu.gov.in/career_booklet.html" }
      ]
    },
    {
      id: 13,
      category: "Educational Tourism",
      icon: <Map className="w-6 h-6 text-white" />,
      gradient: "from-rose-600 to-rose-400",
      description: "Heritage sites and educational travel.",
      links: [
        { name: "TN Tourism – Temples", url: "https://www.tamilnadutourism.tn.gov.in/destinations/temples" },
        // Added Wanderlust here
        { name: "Wanderlust Travel Magazine", url: "https://www.wanderlustmagazine.com/" }
      ]
    }
  ];

  const filteredResources = resources.filter(cat => 
    cat.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cat.links.some(link => link.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image - Fixed Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop')",
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/85 to-blue-900/90"></div>
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto z-20 pb-32">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-200 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Knowledge at your fingertips</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Digital Resource <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Hub</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Explore a curated collection of government portals, digital libraries, textbooks, and career guidance tools designed to empower students and educators.
            </p>
          </div>
        </div>

        {/* Decorative Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-gray-50 fill-current block">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* --- SEARCH & CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-30 pb-20">
        
        {/* Search Bar Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-16 mx-auto max-w-3xl border border-gray-100/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 w-6 h-6" />
            <input
              type="text"
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder-gray-400 text-gray-700"
              placeholder="What are you looking for? (e.g., Textbooks, Jobs...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {['Scholarships', 'Textbooks', 'Exams', 'Jobs', 'Tourism'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-full text-sm font-medium transition-colors border border-gray-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((section, index) => (
            <div 
              key={section.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}
              style={{
                animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`,
                opacity: 0 // Start hidden for animation
              }}
            >
              {/* Card Header with Gradient */}
              <div className={`h-24 bg-gradient-to-r ${section.gradient} p-6 relative overflow-hidden`}>
                <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30 shadow-inner">
                    {section.icon}
                  </div>
                  <Globe className="text-white/20 w-12 h-12 absolute right-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {section.category}
                </h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">
                  {section.description}
                </p>

                {/* Links List */}
                <div className="space-y-3">
                  {section.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 group/link transition-all duration-200 border border-transparent hover:border-indigo-100"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-indigo-700 truncate mr-2">
                        {link.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover/link:text-indigo-500 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 font-semibold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      {/* Animation Keyframes Style */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}