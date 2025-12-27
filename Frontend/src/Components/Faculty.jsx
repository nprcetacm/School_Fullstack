import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, BookOpen, Clock, Users, User, Filter, BadgeCheck, Briefcase } from 'lucide-react';
import api from '../api';

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [teachers, setTeachers] = useState([]);
  const [nonTeaching, setNonTeaching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, nonTeachingRes] = await Promise.all([
          api.get('/faculty/teachers'),
          api.get('/faculty/non-teaching')
        ]);
        setTeachers(teachersRes.data);
        setNonTeaching(nonTeachingRes.data);
      } catch (err) {
        console.error("Error fetching faculty data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper: Calculate Years of Service
  const calculateExperience = (dateInput) => {
    if (!dateInput) return 0;
    const joinDate = new Date(dateInput);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    return diffYears;
  };

  // Filter Logic
  const filteredTeachers = teachers.filter(teacher => {
    // Parse subjects if it's a string (JSON string from DB)
    let subjects = [];
    if (typeof teacher.subjects === 'string') {
      try {
        subjects = JSON.parse(teacher.subjects);
      } catch (e) {
        subjects = [teacher.subjects]; // Fallback
      }
    } else if (Array.isArray(teacher.subjects)) {
      subjects = teacher.subjects;
    }

    // Attach parsed subjects to teacher object temporarily for rendering if needed, 
    // but better to handle it in rendering or map it before.
    // Let's just use the parsed 'subjects' for filtering.

    // Check if name or any subject matches
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || teacher.role.includes(filterType);
    return matchesSearch && matchesType;
  });


  return (
    <div className="min-h-screen bg-slate-50 mt-16 font-sans">

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-10 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Dedicated Faculty</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Meet the passionate educators and staff who nurture, guide, and inspire our students every day.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400">{teachers.length}</div>
              <div className="text-xs text-indigo-200 uppercase tracking-wider">Teaching Staff</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-pink-400">{nonTeaching.length}</div>
              <div className="text-xs text-indigo-200 uppercase tracking-wider">Support Staff</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-emerald-400">15+</div>
              <div className="text-xs text-indigo-200 uppercase tracking-wider">Avg Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-cyan-400">100%</div>
              <div className="text-xs text-indigo-200 uppercase tracking-wider">Qualified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- CONTROLS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-30">

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or subject..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'PGT', 'TGT'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${filterType === type
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {type === 'All' ? 'All Faculty' : type}
              </button>
            ))}
          </div>
        </div>

        {/* --- TEACHING FACULTY GRID --- */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Teaching Faculty</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher, index) => {
              // Parse subjects render
              let subjects = [];
              if (typeof teacher.subjects === 'string') {
                try { subjects = JSON.parse(teacher.subjects); } catch (e) { subjects = [teacher.subjects]; }
              } else if (Array.isArray(teacher.subjects)) {
                subjects = teacher.subjects;
              }

              return (
                <div
                  key={teacher.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
                >
                  {/* Colored Top Border */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${teacher.role.includes('PGT') ? 'bg-purple-500' : 'bg-emerald-500'
                    }`}></div>

                  <div className="flex items-start gap-4">
                    {/* Avatar Placeholder */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg shrink-0 ${teacher.gender === 'Female'
                      ? 'bg-gradient-to-br from-pink-400 to-rose-500'
                      : 'bg-gradient-to-br from-blue-400 to-indigo-500'
                      }`}>
                      {teacher.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate pr-2 group-hover:text-indigo-600 transition-colors">
                        {teacher.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${teacher.role.includes('PGT')
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                          }`}>
                          {teacher.role}
                        </span>
                        {calculateExperience(teacher.exp) > 15 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" /> Senior
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span className="font-medium truncate">{subjects.join(", ")}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                        <GraduationCap className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span className="truncate">{teacher.qual}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                        <Users className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span className="truncate">{teacher.class}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                        <Clock className="w-4 h-4 text-indigo-500" />
                      </div>
                      <span>{calculateExperience(teacher.exp)} Years Service</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredTeachers.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              <User className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No faculty found matching your search.</p>
            </div>
          )}
        </div>

        {/* --- NON-TEACHING STAFF SECTION --- */}
        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl font-bold text-gray-800">Administrative Support Staff</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nonTeaching.map((staff) => (
              <div key={staff.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 border-l-4 border-slate-400">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${staff.gender === 'Female' ? 'bg-slate-400' : 'bg-slate-500'
                  }`}>
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{staff.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{staff.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{staff.qual} • {calculateExperience(staff.exp)} Years Exp</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}