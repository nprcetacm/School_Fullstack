import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, FileText, Download, ChevronRight } from 'lucide-react';

export default function Curriculum() {
  const [selectedGrade, setSelectedGrade] = useState('middle');

  const gradeCategories = [
    { id: 'middle', label: 'Classes 6-8', tamil: 'வகுப்பு 6-8' },
    { id: 'secondary', label: 'Classes 9-10', tamil: 'வகுப்பு 9-10' },
    { id: 'higher', label: 'Classes 11-12', tamil: 'வகுப்பு 11-12' }
  ];

  const curriculumData = {
    middle: {
      subjects: [
        // { name: 'Tamil', tamil: 'தமிழ்', code: 'TAM', hours: '5 hrs/week' },
        { name: 'Tamil', tamil: 'தமிழ்', code: 'TAM'  },
        { name: 'English', tamil: 'ஆங்கிலம்', code: 'ENG'  },
        { name: 'Mathematics', tamil: 'கணிதம்', code: 'MAT'  },
        { name: 'Science', tamil: 'அறிவியல்', code: 'SCI'  },
        { name: 'Social Science', tamil: 'சமூக அறிவியல்', code: 'SSC',   
          subtext: 'History, Geography, Civics' },
        { name: 'Computer Science', tamil: 'கணினி அறிவியல்', code: 'CS',  
          badge: 'Optional' }
      ],
      features: [
        'Tamil Nadu State Board (Samacheer Kalvi)',
        'Subject-specific learning approach',
        'Practical lab sessions for Science',
        'Continuous and comprehensive evaluation'
      ]
    },
    secondary: {
      subjects: [
        { name: 'Tamil', tamil: 'தமிழ்', code: 'TAM',   },
        { name: 'English', tamil: 'ஆங்கிலம்', code: 'ENG',  },
        { name: 'Mathematics', tamil: 'கணிதம்', code: 'MAT',   },
        { name: 'Science', tamil: 'அறிவியல்', code: 'SCI', 
          subtext: 'Physics, Chemistry, Biology' },
        { name: 'Social Science', tamil: 'சமூக அறிவியல்', code: 'SSC', 
          subtext: 'History, Geography, Civics, Economics' },
        { name: 'Computer Science', tamil: 'கணினி அறிவியல்', code: 'CS', 
          badge: 'Optional' }
      ],
      features: [
        'Tamil Nadu State Board (Samacheer Kalvi)',
        'Board exam preparation (Class 10)',
        'Advanced practical training in Science',
        'Career guidance and counseling',
        'Focus on holistic development'
      ]
    },
    higher: {
      subjects: [
        { name: 'Tamil', tamil: 'தமிழ்', code: 'TAM',  },
        { name: 'English', tamil: 'ஆங்கிலம்', code: 'ENG'},
        { name: 'Mathematics', tamil: 'கணிதம்', code: 'MAT',badge: 'Core Subject' },
        { name: 'Physics', tamil: 'இயற்பியல்', code: 'PHY'  },
        { name: 'Chemistry', tamil: 'வேதியியல்', code: 'CHE'  },
        { name: 'Biology', tamil: 'உயிரியல்', code: 'BIO'  },
        { name: 'Computer Science', tamil: 'கணினி அறிவியல்', code: 'CS' ,
          badge: 'Optional' },
        { name: 'Commerce', tamil: 'வணிகவியல்', code: 'COM', 
          badge: 'Optional' },
        { name: 'Accountancy', tamil: 'கணக்கியல்', code: 'ACC', 
          badge: 'Optional' },
        { name: 'Economics', tamil: 'பொருளாதாரம்', code: 'ECO', 
          badge: 'Optional' },
        { name: 'History', tamil: 'வரலாறு', code: 'HIS', 
          badge: 'Optional' },
        { name: 'Geography', tamil: 'புவியியல்', code: 'GEO', 
          badge: 'Optional' }
      ],
      features: [
        'Tamil Nadu State Board (Samacheer Kalvi)',
        'Stream-based education (Science/Commerce/Arts)',
        'Higher Secondary Board exam preparation (Class 12)',
        'Advanced laboratory facilities',
        'College entrance exam guidance',
        'Specialization in chosen subjects'
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-25 p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Curriculum</h1>
            <p className="text-blue-600 font-medium">பாடத்திட்டம்</p>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Corporation Higher Secondary School, Sundararajapuram, Madurai
        </p>
        <p className="text-gray-500 mt-1">
          Tamil Nadu State Board (Samacheer Kalvi) - Classes 6-12
        </p>
      </div>

      {/* Grade Category Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {gradeCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedGrade(category.id)}
            className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
              selectedGrade === category.id
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
            }`}
          >
            <div className="text-center">
              <div>{category.label}</div>
              <div className="text-xs mt-1 opacity-90">{category.tamil}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Curriculum Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              Subjects
              <span className="text-lg text-blue-600 ml-2">பாடங்கள்</span>
            </h2>
            
            <div className="space-y-4">
              {curriculumData[selectedGrade].subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                            {subject.badge && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                {subject.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-600">{subject.tamil}</p>
                          {subject.subtext && (
                            <p className="text-xs text-gray-500 mt-1 italic">{subject.subtext}</p>
                          )}
                        </div>
                      </div>
                      <div className="ml-11 flex items-center gap-4 text-sm">
                        <span className="bg-white px-3 py-1 rounded-full text-gray-700 font-medium">
                          {subject.code}
                        </span>
                        {/* <span className="text-gray-600 flex items-center gap-1">
                          <ChevronRight className="w-4 h-4" />
                          {subject.hours}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features & Info */}
        <div className="space-y-6">
          {/* Key Features */}
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Key Features
            </h3>
            <ul className="space-y-3">
              {curriculumData[selectedGrade].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-2">சமச்சீர் கல்வி</h4>
            <p className="text-sm text-blue-800 mb-3">
              Samacheer Kalvi - Tamil Nadu State Board curriculum with emphasis on holistic development and practical learning.
            </p>
            <div className="text-xs text-blue-700 space-y-1">
              <p>✓ Recognized by Government of Tamil Nadu</p>
              <p>✓ Comprehensive evaluation system</p>
              <p>✓ Prepares students for higher education</p>
            </div>
          </div>

          {/* Stream Info for Higher Secondary */}
          {selectedGrade === 'higher' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h4 className="font-bold text-green-900 mb-2">Available Streams</h4>
              <div className="space-y-2 text-sm text-green-800">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <strong>Science:</strong> Physics, Chemistry, Biology/Computer Science
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <strong>Commerce:</strong> Accountancy, Commerce, Economics
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <strong>Arts:</strong> History, Geography, Economics
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}