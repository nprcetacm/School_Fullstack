import React, { useState, useEffect } from 'react';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import api from '../api';

export default function SchoolToppers() {
  const [toppersData, setToppersData] = useState({
    std12: { title: 'SCHOOL TOPPERS STD - XII', students: [] },
    std11: { title: 'SCHOOL TOPPERS STD - XI', students: [] },
    std10: { title: 'SCHOOL TOPPERS STD - X', students: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const res = await api.get('/toppers');
        const allToppers = res.data;

        // Helper to sort by rank
        const sortByRank = (a, b) => a.rank - b.rank;

        const std12 = allToppers.filter(t => t.std === '12').sort(sortByRank);
        const std11 = allToppers.filter(t => t.std === '11').sort(sortByRank);
        const std10 = allToppers.filter(t => t.std === '10').sort(sortByRank);

        setToppersData({
          std12: { title: 'SCHOOL TOPPERS STD - XII', students: std12 },
          std11: { title: 'SCHOOL TOPPERS STD - XI', students: std11 },
          std10: { title: 'SCHOOL TOPPERS STD - X', students: std10 }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6" />;
      case 2:
        return <Medal className="w-6 h-6" />;
      case 3:
        return <Award className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getRankColors = (rank) => {
    switch (rank) {
      case 1:
        return { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-400' };
      case 2:
        return { bg: 'bg-slate-400', text: 'text-slate-600', border: 'border-slate-300' };
      case 3:
        return { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-500' };
      default:
        return { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-400' };
    }
  };

  const StudentCard = ({ student, index }) => {
    if (!student) return null;
    const colors = getRankColors(student.rank);
    const isCenter = index === 0;
    const percentage = ((student.score / student.outOf) * 100).toFixed(1);

    return (
      <div className={`flex flex-col items-center ${isCenter ? 'lg:-mt-8' : 'lg:mt-8'}`}>
        {/* Large Photo with Rank Badge */}
        <div className="relative group">
          <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Rank Badge */}
          <div className={`absolute -top-4 -right-4 ${colors.bg} text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10 transform group-hover:scale-110 transition-transform`}>
            {getRankIcon(student.rank)}
          </div>

          {/* Rank Number at Bottom */}
          <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 ${colors.bg} text-white px-6 py-2 rounded-full shadow-lg font-bold text-lg border-4 border-white`}>
            Rank {student.rank}
          </div>
        </div>

        {/* Student Details Below Photo */}
        <div className="mt-8 text-center space-y-3 w-full max-w-xs">
          <h3 className="text-2xl font-bold text-gray-800">
            {student.name}
          </h3>

          <div className={`inline-flex items-center gap-2 ${colors.text} bg-gray-50 px-4 py-2 rounded-full border-2 ${colors.border}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span className="font-semibold text-sm">
              Group: {student.group}
            </span>
          </div>

          {/* Score Display */}
          <div className="mt-4 bg-white rounded-xl shadow-md border-2 border-gray-200 p-5">
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-5xl font-bold ${colors.text}`}>
                {percentage}%
              </span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Percentage
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ToppersSection = ({ data }) => (
    <div className="mb-24">
      {/* Section Title with Decorative Line */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 inline-block bg-white px-8 relative">
          <span className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-blue-600" />
            {data.title}
            <Trophy className="w-8 h-8 text-blue-600" />
          </span>
        </h2>
      </div>

      {/* Student Cards - Winner in Center */}
      <div className="flex flex-wrap justify-center gap-12 lg:gap-16 max-w-6xl mx-auto">
        {/* Rank 1 - Center Position */}
        {data.students[0] && <StudentCard student={data.students[0]} index={0} />}

        {/* Rank 2 and 3 */}
        {data.students[1] && <StudentCard student={data.students[1]} index={1} />}
        {data.students[2] && <StudentCard student={data.students[2]} index={2} />}
      </div>
    </div>
  );

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-blue-50 px-5 py-2 rounded-full border-2 border-blue-200">
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className="text-blue-700 font-semibold text-sm">Excellence Achieved</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Star Performers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating exceptional achievements and academic excellence
          </p>
        </div>

        {/* Std XII Toppers */}
        <ToppersSection data={toppersData.std12} />

        {/* Std XI Toppers */}
        <ToppersSection data={toppersData.std11} />

        {/* Std X Toppers */}
        <ToppersSection data={toppersData.std10} />

      </div>
    </section>
  );
}