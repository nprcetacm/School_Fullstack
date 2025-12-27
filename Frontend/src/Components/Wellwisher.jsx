import React from 'react';
import { User, FileText, Download, Globe, ExternalLink } from 'lucide-react';
import orgchartPdf from '../schoolassets/org_chart.pdf';

export default function Administration() {
  
  // Data for the Chart - Updated for TN School Education 2024-25
  const officers = {
    head: {
      name: "Tmt. S. Madhumathi, IAS",
      designation: "Secretary to Government",
      role: "School Education Department",
      color: "border-indigo-600 text-indigo-700"
    },
    level2: [
      {
        name: "Dr. S. Kannappan",
        designation: "Director of School Education",
        role: "Head of Department",
        color: "border-blue-500 text-blue-700"
      },
      {
        name: "Dr. M. Aarthi, IAS",
        designation: "State Project Director",
        role: "Samagra Shiksha",
        color: "border-purple-500 text-purple-700"
      },
      {
        name: "Tmt. N. Latha",
        designation: "Director",
        role: "Govt Examinations",
        color: "border-pink-500 text-pink-700"
      }
    ],
    level3: [
      {
        name: "Tmt. A. Gnanagowri",
        designation: "Joint Director",
        role: "Higher Secondary",
        color: "border-emerald-500 text-emerald-700"
      },
      {
        name: "Thiru. R. Boopathi",
        designation: "Joint Director",
        role: "Secondary Education",
        color: "border-emerald-500 text-emerald-700"
      },
      {
        name: "Thiru. V. Jayakumar",
        designation: "Joint Director",
        role: "Vocational Education",
        color: "border-emerald-500 text-emerald-700"
      }
    ]
  };

  // Profile Card Component
  const OfficerCard = ({ officer, size = "normal" }) => {
    const isLarge = size === "large";
    const boxSize = isLarge ? "w-40 h-40" : "w-32 h-32";
    
    return (
      <div className="flex flex-col items-center group relative z-10">
        <div className={`${boxSize} rounded-full overflow-hidden border-4 ${officer.color} bg-white shadow-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 mb-4`}>
          {officer.image ? (
            <img src={officer.image} alt={officer.name} className="w-full h-full object-cover" />
          ) : (
            <User className={`w-1/2 h-1/2 ${officer.color.split(' ')[1]} opacity-50`} />
          )}
        </div>
        
        <div className="text-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{officer.name}</h3>
          <p className={`text-sm font-semibold mt-1 ${officer.color.split(' ')[1]}`}>{officer.designation}</p>
          <p className="text-xs text-gray-500">{officer.role}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 mt-16 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold">
            Leadership & Governance
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
            Top Officers of School Education
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The visionary leaders guiding the Tamil Nadu School Education Department towards excellence and innovation.
          </p>
        </div>

        {/* --- PYRAMID CHART STRUCTURE --- */}
        <div className="relative flex flex-col items-center space-y-16 lg:space-y-20 pb-10">
          
          {/* Connecting Lines Layer (Background) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 640 160 L 640 240 M 640 240 L 300 240 L 300 300 M 640 240 L 980 240 L 980 300 M 640 240 L 640 300" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Level 1: Secretary */}
          <div className="w-full flex justify-center">
            <OfficerCard officer={officers.head} size="large" />
          </div>

          {/* Level 2: Directors */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
            {officers.level2.map((officer, index) => (
              <OfficerCard key={index} officer={officer} />
            ))}
          </div>

          {/* Level 3: Joint Directors */}
          <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
            <h3 className="text-center text-gray-500 font-semibold mb-8 uppercase tracking-wider text-sm">Joint Directors (Operations)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
              {officers.level3.map((officer, index) => (
                <OfficerCard key={index} officer={officer} />
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col items-center gap-4">
          
          {/* 1. PDF Download Button */}
          <a 
            href={orgchartPdf} 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white border-2 border-indigo-100 hover:border-indigo-600 px-8 py-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md"
          >
            <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-600 transition-colors">
              <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white" />
            </div>
            <div className="text-left flex-1">
              <p className="text-gray-900 font-bold group-hover:text-indigo-600 transition-colors">Download Organization Chart</p>
              <p className="text-xs text-gray-500">Full detailed hierarchy (PDF)</p>
            </div>
            <Download className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
          </a>

          {/* 2. Official Website Link (ADDED THIS) */}
          <a 
            href="https://tnschools.gov.in" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-8 py-3 rounded-2xl transition-all duration-300 w-full max-w-md"
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-left flex-1">
              <p className="text-indigo-800 font-semibold">Visit Official TN Schools Website</p>
              <p className="text-xs text-indigo-600">tnschools.gov.in</p>
            </div>
            <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600" />
          </a>

        </div>

      </div>
    </div>
  );
}