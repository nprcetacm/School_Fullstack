import React, { useState, useEffect } from 'react';
import { Search, Calendar, Award, X } from 'lucide-react';
import api from '../api';

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get('/achievements');
        // Ensure images is array
        const formatted = res.data.map(item => ({
          ...item,
          images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images,
          // Ensure year is string for filter comparison if needed, DB matches logic mostly
          year: item.year.toString()
        }));
        setAchievements(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAchievements();
  }, []);

  const years = ['all', ...Array.from(new Set(achievements.map(a => a.year))).sort().reverse()];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || achievement.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6 mt-25">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">Student Achievements</h1>
          <p className="text-emerald-700">Celebrating excellence and success</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 bg-white appearance-none cursor-pointer"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image Gallery */}
              <div className="relative h-48 bg-emerald-100">
                <div className="relative h-48 overflow-hidden">
                  {achievement.images && achievement.images.length > 0 ? (
                    <img
                      src={achievement.images[0]}
                      alt={achievement.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Thumbnail
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-emerald-600">{achievement.category}</span>
                  </div>
                </div>
                {achievement.images && achievement.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-white/90 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold">
                    +{achievement.images.length - 1} more
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-emerald-600 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(achievement.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2 line-clamp-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {achievement.description}
                </p>
                <div className="mt-4">
                  <span className="text-emerald-600 text-sm font-semibold hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No achievements found matching your criteria.</p>
          </div>
        )}

        {/* Modal */}
        {selectedAchievement && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAchievement(null)}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-emerald-600 text-white p-6 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedAchievement.title}</h2>
                  <div className="flex items-center gap-4 text-emerald-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedAchievement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm">
                      {selectedAchievement.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedAchievement.images && selectedAchievement.images.length > 0 ? (
                    selectedAchievement.images.map((img, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={img}
                          alt={`${selectedAchievement.title} - Image ${idx + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="relative h-96 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg shadow-md">
                      No Preview Available
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">About this Achievement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedAchievement.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;