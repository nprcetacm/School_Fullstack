import { useState } from 'react';
import { ChevronDown, Menu, X, LogIn, Sparkles, FileText, User } from 'lucide-react';
import logo from "../schoolassets/newSchoollogo.png"
import { Link } from 'react-router-dom';
import TamilThaiPlayer from './TamilThaiPlayer';

// Import the PDF
import orgChartPdf from '../schoolassets/org_chart.pdf';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About', // Shortened from 'About Us' for better fit
      dropdown: [
        { name: 'History Vision Mission', path:'/history' },
        { name: 'Administration', path:'/wellwisher', icon: <User className="w-4 h-4"/> }, 
        { name: 'Organization Chart', path: orgChartPdf, isPdf: true, icon: <FileText className="w-4 h-4"/> },
        { name: 'Principal Message', path:'/principal' },
        { name: 'Faculty and Staff', path:'/faculty' }
      ]
    },
    {
      name: 'Academics',
      dropdown: [
        { name: 'Curriculum',path: '/curriculum' },
        { name: 'Class Structure', path:'/classstruct' },
        { name: 'Special Programs', path:'/specialprog' }
      ]
    },
    { 
      name: 'Digital Library', 
      path: '/lib',
      isSpecial: true 
    },
    {
      name: 'Admission',
      dropdown: [
        { name: 'Admission Process', path: '/admission-process' },
        { name: 'Fee Structure', path: '/fee-structure' },
        { name: 'Admission Criteria', path: '/admission-criteria' }
      ]
    },
    {
      name: 'Facilities',
      dropdown: [
        { name: 'Laboratory', path: '/lab' },
        { name: 'Pure Water', path: '/water' },
      ]
    },
    {
      name: 'News', // Shortened from 'News/Events'
      dropdown: [
        { name: 'Noticeboard', path: '/noticeboard' },
        { name: 'Calendar', path: '/calendar' },
        { name: 'Photo Gallery', path: '/photos' },
      ]
    },
    { name: 'Achievements', path:'/achievements'},
    { name:'Contact', path:'/contact' }
  ];

  const handleMouseEnter = (itemName) => {
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <>
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img className="h-12 w-auto sm:h-14 xl:h-16" src={logo} alt="School Logo" />
          </div>

          {/* Desktop Menu - Optimized for Fit */}
          <div className="hidden xl:flex items-center justify-center flex-1 mx-2">
            <div className="flex items-center space-x-0.5 2xl:space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button className="text-gray-700 hover:text-indigo-600 px-2 py-2 text-[13px] 2xl:text-sm font-medium flex items-center gap-0.5 transition-colors whitespace-nowrap">
                        {item.name}
                        <ChevronDown className="w-3 h-3 2xl:w-4 2xl:h-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div 
                          className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100"
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.dropdown.map((subItem) => (
                            subItem.isPdf ? (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                              >
                                {subItem.icon}
                                {subItem.name}
                              </a>
                            ) : (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-2 py-2 rounded-md text-[13px] 2xl:text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1
                        ${item.isSpecial 
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold hover:scale-105' 
                          : 'text-gray-700 hover:text-indigo-600'
                        }`}
                    >
                      {item.isSpecial && <Sparkles className="w-3 h-3 2xl:w-4 2xl:h-4 text-fuchsia-500" />}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Compact Layout */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-4 flex-shrink-0">
            {/* Audio Player Container - Hides text on smaller laptops */}
            <div className="scale-90 2xl:scale-100 origin-right">
              <TamilThaiPlayer/>
            </div>
            
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs 2xl:text-sm font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="xl:hidden text-gray-700 hover:text-indigo-600 p-2"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Same as before) */}
      {mobileMenu && (
        <div className="xl:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 space-y-1 bg-gray-50 rounded-lg">
                        {item.dropdown.map((subItem) => (
                          subItem.isPdf ? (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-md transition-colors flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              {subItem.name} (PDF)
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-md transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors flex items-center gap-2
                      ${item.isSpecial ? 'text-fuchsia-600 font-bold bg-fuchsia-50' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                  >
                    {item.isSpecial && <Sparkles className="w-4 h-4" />}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" className="flex items-center justify-center gap-2 mx-3 my-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              <LogIn className="w-5 h-5" /> Login
            </Link>
          </div>
          <div className="px-4 py-3 border-t border-gray-100">
            <TamilThaiPlayer/>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}