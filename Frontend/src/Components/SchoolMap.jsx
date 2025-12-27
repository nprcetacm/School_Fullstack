import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function SchoolMap() {
  return (
    <section className="py-12 lg:py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Navigation className="w-4 h-4" />
            <span>Visit Campus</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Us on Map
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
            We are located in the heart of Madurai. Visit our campus to experience our vibrant learning environment.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-3">
            
            {/* Left Side: Contact Info */}
            {/* FIXED: Reduced padding from p-10 to p-6 for mobile */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 lg:p-10 text-white lg:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 border-b border-slate-700 pb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-6 lg:space-y-8">
                  {/* Location Item */}
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="bg-white/10 p-2 lg:p-3 rounded-lg lg:rounded-xl backdrop-blur-sm flex-shrink-0">
                      <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-base lg:text-lg text-blue-100 mb-1">Our Location</p>
                      <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                        Corporation Higher Secondary School,<br />
                        Sundararajapuram,<br />
                        Madurai - 625011, Tamil Nadu.
                      </p>
                    </div>
                  </div>

                  {/* Phone Item */}
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="bg-white/10 p-2 lg:p-3 rounded-lg lg:rounded-xl backdrop-blur-sm flex-shrink-0">
                      <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-base lg:text-lg text-green-100 mb-1">Phone Number</p>
                      <a href="tel:+919677960831" className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block">
                        +91 96779 60831
                      </a>
                    </div>
                  </div>

                  {/* Email Item */}
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="bg-white/10 p-2 lg:p-3 rounded-lg lg:rounded-xl backdrop-blur-sm flex-shrink-0">
                      <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-base lg:text-lg text-purple-100 mb-1">Email Address</p>
                      <a href="mailto:contact@corpschool.edu.in" className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors break-all">
                        contact@corpschool.edu.in
                      </a>
                    </div>
                  </div>

                  {/* Office Hours Item */}
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="bg-white/10 p-2 lg:p-3 rounded-lg lg:rounded-xl backdrop-blur-sm flex-shrink-0">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-base lg:text-lg text-orange-100 mb-1">Office Hours</p>
                      <p className="text-sm lg:text-base text-gray-300">Mon - Fri: 9:00 AM - 4:30 PM</p>
                      <p className="text-sm lg:text-base text-gray-300">Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-white/10">
                <a 
                  href="https://maps.app.goo.gl/VPZBk4rCDt4mk8Wa9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-sm lg:text-base"
                >
                  <Navigation className="w-4 h-4 lg:w-5 lg:h-5" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Right Side: Google Map Iframe */}
            <div className="lg:col-span-2 h-[400px] lg:h-auto bg-gray-100 relative">
              <iframe 
                src="https://maps.google.com/maps?q=Corporation+Higher+Secondary+School,+Sundararajapuram,+Madurai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                title="School Location Map"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}