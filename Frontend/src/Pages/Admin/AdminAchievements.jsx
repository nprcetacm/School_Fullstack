import React, { useState, useEffect } from 'react';
import {
    Trophy,
    PlusCircle,
    Pencil,
    Trash2,
    X,
    Check,
    Calendar,
    Award,
    Hash,
    FileText,
    Image as ImageIcon,
    Search,
    ChevronRight,
    Loader2
} from 'lucide-react';
import api from '../../api';

const AdminAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '', date: '', year: '', description: '', category: ''
    });
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/achievements');
            setAchievements(res.data);
        } catch (err) {
            console.error('Error fetching achievements:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Generate previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';
        setFormData({
            title: item.title,
            date: formattedDate,
            year: item.year,
            description: item.description,
            category: item.category
        });
        setImages([]);
        setPreviews([]);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditItem(null);
        setFormData({ title: '', date: '', year: '', description: '', category: '' });
        setImages([]);
        setPreviews([]);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            if (editItem) {
                await api.put(`/achievements/${editItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/achievements', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchAchievements();
            handleCancelEdit();
        } catch (err) {
            console.error('Error saving achievement:', err);
            const msg = err.response?.data?.message || err.response?.data?.msg || 'Failed to save achievement. Please try again.';
            alert(msg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this achievement?')) {
            try {
                await api.delete(`/achievements/${id}`);
                fetchAchievements();
            } catch (err) {
                console.error('Error deleting achievement:', err);
            }
        }
    };

    const filteredAchievements = achievements.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">School Achievements</h2>
                    <p className="text-slate-500 text-sm">Manage and showcase the awards and honors won by the school.</p>
                </div>
                <button
                    onClick={() => { editItem ? handleCancelEdit() : setShowForm(!showForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                    {showForm ? <X className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                    {showForm ? 'Close' : 'Add Achievement'}
                </button>
            </div>

            {/* Form Card */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            {editItem ? <Pencil className="w-4 h-4 text-indigo-500" /> : <Trophy className="w-4 h-4 text-indigo-500" />}
                            {editItem ? 'Update Achievement' : 'Record New Achievement'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-indigo-500" /> Title
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. District Sports Meet Winner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-indigo-500" /> Category
                                </label>
                                <input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. Sports, Academic, Arts"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-500" /> Date & Year
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        placeholder="Year"
                                        className="w-24 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-500" /> Full Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                placeholder="Describe the achievement in detail..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-indigo-500" /> Media Attachments
                            </label>
                            <div className="flex flex-wrap gap-4">
                                <div className="relative group w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-slate-100 transition-all cursor-pointer">
                                    <PlusCircle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
                                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">Upload</span>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImagesChange}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                {previews.map((src, idx) => (
                                    <div key={idx} className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                                        <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <X className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {editItem && (
                                <p className="text-xs text-amber-600 font-medium italic">
                                    Note: Uploading new images will replace the existing ones.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2"
                            >
                                {editItem ? <Check className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                                {editItem ? 'Update Achievement' : 'Save Achievement'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-bold text-slate-800">Honor Roll</h3>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search honors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
                            <span className="font-medium">Acquiring achievements list...</span>
                        </div>
                    ) : filteredAchievements.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                <Award className="w-8 h-8 text-slate-200" />
                            </div>
                            <p className="font-medium text-slate-500">No achievements found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAchievements.map(item => (
                                <div key={item.id} className="group border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 relative overflow-hidden bg-white">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 flex-shrink-0">
                                            <Trophy className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider mb-2 inline-block">
                                                {item.category}
                                            </span>
                                            <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                            <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(item.date).toLocaleDateString()} ({item.year})</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {/* Mock images if available in schema or just indicator */}
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                IMG
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-xs font-bold text-indigo-600 flex items-center gap-1 group/btn"
                                        >
                                            Full Details <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAchievements;
