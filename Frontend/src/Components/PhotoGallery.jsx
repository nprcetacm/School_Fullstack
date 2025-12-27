import { useState, useEffect } from 'react';
import { X, Calendar, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import api from '../api';

export default function PhotoGallery() {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        setGalleryData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedYear, setSelectedYear] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", ...new Set(galleryData.map(item => item.category))];
  const years = ["All", ...Array.from(new Set(galleryData.map(item => new Date(item.date).getFullYear().toString()))).sort().reverse()];

  // Filter and search logic
  let filteredGallery = galleryData;

  if (filter !== "All") {
    filteredGallery = filteredGallery.filter(item => item.category === filter);
  }

  if (selectedYear !== "All") {
    filteredGallery = filteredGallery.filter(item =>
      new Date(item.date).getFullYear().toString() === selectedYear
    );
  }

  if (searchTerm) {
    filteredGallery = filteredGallery.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort by date
  filteredGallery = [...filteredGallery].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) =>
        (prev - 1 + selectedItem.images.length) % selectedItem.images.length
      );
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            School Gallery
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore memorable moments and achievements from our school community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events, activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* Year Filter Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
            >
              <option value="All">All Years</option>
              {years.filter(year => year !== "All").map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 justify-center"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Filter by Category:</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal-50'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredGallery.length} {filteredGallery.length === 1 ? 'result' : 'results'}
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Thumbnail
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-teal-600">{item.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <Calendar size={16} />
                  <span>{formatDate(item.date)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.shortDescription}
                </p>
                <button className="mt-4 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No results found. Try adjusting your filters or search term.</p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
                <div>
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-2">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedItem.title}</h2>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Calendar size={18} />
                    <span>{formatDate(selectedItem.date)}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Image Gallery with Navigation */}
              <div className="relative">
                <div className="relative h-96 bg-gray-100">
                  {selectedItem.images && selectedItem.images.length > 0 ? (
                    <img
                      src={selectedItem.images[currentImageIndex]}
                      alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Preview Available
                    </div>
                  )}

                  {selectedItem.images && selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedItem.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {selectedItem.images.length > 1 && (
                  <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
                    {selectedItem.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx
                          ? 'border-teal-600 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Event</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {selectedItem.fullDescription}
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Quick Summary:</strong> {selectedItem.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}