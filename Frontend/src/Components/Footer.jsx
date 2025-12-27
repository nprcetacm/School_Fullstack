// src/Components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronRight, Clock, Heart, Share2 } from 'lucide-react';
import logo from '../schoolassets/newSchoollogo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ✅ UPDATED: Smooth Scroll Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // <--- This enables the smooth animation
    });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/history' },
    { name: 'Academics', path: '/curriculum' },
    { name: 'Admissions', path: '/admission-process' },
    { name: 'Library', path: '/lib' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const facilities = [
    { name: 'Library', path: '/lib' },
    { name: 'Science Labs', path: '/lab' },
    { name: 'Sports Complex', path: '/achievements' },
    { name: 'Smart Classrooms', path: '/photos' }
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 relative overflow-hidden font-sans">
      {/* Decorative Top Border */}
      <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: School Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="School Logo" className="h-12 w-auto brightness-200 grayscale-0" />
              <div className="text-white font-bold text-lg leading-tight">
                Corporation Higher<br/>Secondary School
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Nurturing young minds with excellence in education, character building, and creating future leaders since 1975.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/tnschoolsedu?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/tnschoolsedu" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/tnschoolsedu?igshid=MDM4ZDc5MmU=" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@tnschoolsofficial" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              {/* <a href="https://sharechat.com/profile/tnschoolsedu?referer=tagProfileSearchPage" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    onClick={scrollToTop}
                    className="flex items-center gap-2 hover:text-indigo-400 transition-colors duration-300 group"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-sm">
                  Sundararajapuram,<br />
                  Madurai - 625011,<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm hover:text-white cursor-pointer transition-colors">
                  +91 9677960831
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm hover:text-white cursor-pointer transition-colors">
                  contact@corpschool.edu.in
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Facilities */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
              School Hours
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
              <div className="flex items-start gap-3 mb-2">
                <Clock className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Mon - Fri</p>
                  <p className="text-sm text-gray-400">9:00 AM - 4:30 PM</p>
                </div>
              </div>
              <div className="ml-8">
                <p className="text-white font-semibold">Saturday</p>
                <p className="text-sm text-gray-400">9:00 AM - 1:00 PM</p>
              </div>
            </div>
            
            <h4 className="text-white font-bold text-sm mb-3">Facilities</h4>
            <div className="flex flex-wrap gap-2">
              {facilities.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  onClick={scrollToTop}
                  className="text-xs bg-slate-800 text-gray-400 px-3 py-1 rounded-full border border-slate-700 hover:border-pink-500 hover:text-white transition-all cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Corporation Higher Secondary School. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="#" onClick={scrollToTop} className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" onClick={scrollToTop} className="hover:text-white transition-colors">Terms of Use</Link>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Madurai
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}