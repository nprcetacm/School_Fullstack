import React, { useState, useEffect } from 'react';
import {
    Bell,
    PlusCircle,
    Pencil,
    Trash2,
    X,
    Check,
    Search,
    Pin,
    Calendar,
    Tag,
    AlertTriangle,
    Info,
    Megaphone,
    Clock
} from 'lucide-react';
import api from '../../api';

const AdminNotices = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '', titleEng: '', date: '', category: 'general', priority: 'medium',
        description: '', descriptionEng: '', author: 'Admin', isPinned: false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/notices');
            setNotices(res.data);
        } catch (err) {
            console.error('Error fetching notices:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/notices/${editId}`, formData);
            } else {
                await api.post('/notices', formData);
            }
            fetchNotices();
            resetForm();
            setShowForm(false);
        } catch (err) {
            console.error('Error saving notice:', err);
            const msg = err.response?.data?.message || err.response?.data?.msg || 'Failed to save notice. Please try again.';
            alert(msg);
        }
    };

    const handleEdit = (notice) => {
        setFormData({
            title: notice.title,
            titleEng: notice.titleEng,
            date: notice.date.split('T')[0],
            category: notice.category,
            priority: notice.priority,
            description: notice.description,
            descriptionEng: notice.descriptionEng,
            author: notice.author,
            isPinned: notice.isPinned === 1 || notice.isPinned === true
        });
        setIsEditing(true);
        setEditId(notice.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            try {
                await api.delete(`/notices/${id}`);
                fetchNotices();
            } catch (err) {
                console.error('Error deleting notice:', err);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '', titleEng: '', date: '', category: 'general', priority: 'medium',
            description: '', descriptionEng: '', author: 'Admin', isPinned: false
        });
        setIsEditing(false);
        setEditId(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'exam': return <Info className="w-4 h-4" />;
            case 'event': return <Megaphone className="w-4 h-4" />;
            case 'holiday': return <Calendar className="w-4 h-4" />;
            default: return <Bell className="w-4 h-4" />;
        }
    };

    const filteredNotices = notices.filter(notice =>
        notice.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.descriptionEng.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Notice Board Management</h2>
                    <p className="text-slate-500 text-sm">Create and organize school announcements and events.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                    {showForm ? <X className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                    {showForm ? 'Close Form' : 'Post New Notice'}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            {isEditing ? <Pencil className="w-4 h-4 text-indigo-500" /> : <PlusCircle className="w-4 h-4 text-indigo-500" />}
                            {isEditing ? 'Update Notice' : 'Create New Announcement'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Tamil Content */}
                            <div className="space-y-6">
                                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                    <h4 className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-4">Tamil Content (தமிழ்)</h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">தலைப்பு (Title)</label>
                                            <input
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="Enter title in Tamil"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">விளக்கம் (Description)</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                                placeholder="Enter description in Tamil"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* English Content */}
                            <div className="space-y-6">
                                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4">English Content</h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Title</label>
                                            <input
                                                name="titleEng"
                                                value={formData.titleEng}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="Enter title in English"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Description</label>
                                            <textarea
                                                name="descriptionEng"
                                                value={formData.descriptionEng}
                                                onChange={handleChange}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                                placeholder="Enter description in English"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end border-t border-slate-100 pt-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-500" /> Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-indigo-500" /> Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                >
                                    <option value="general">General</option>
                                    <option value="exam">Exam</option>
                                    <option value="event">Event</option>
                                    <option value="holiday">Holiday</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-indigo-500" /> Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                            <div className="flex items-center h-[46px]">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="isPinned"
                                            checked={formData.isPinned}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${formData.isPinned ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${formData.isPinned ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 flex items-center gap-1">
                                        <Pin className={`w-4 h-4 ${formData.isPinned ? 'fill-indigo-600 text-indigo-600' : 'text-slate-400'}`} />
                                        Pin to Top
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => { resetForm(); setShowForm(false); }}
                                className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2"
                            >
                                {isEditing ? <Check className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                {isEditing ? 'Update Announcement' : 'Publish Notice'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-800">Recent Postings</h3>
                    </div>

                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search notices by title or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                                <th className="px-6 py-4">Announcement Details</th>
                                <th className="px-6 py-4">Status & Priority</th>
                                <th className="px-6 py-4">Publication Info</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="font-medium text-slate-400">Fetching notices...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNotices.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                <Bell className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">No notices found</p>
                                                <p className="text-slate-500 text-sm mt-1">Start by posting your first school announcement.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNotices.map(notice => (
                                <tr key={notice.id} className={`hover:bg-slate-50/70 transition-colors group ${notice.isPinned ? 'bg-indigo-50/30' : ''}`}>
                                    <td className="px-6 py-4 max-w-sm">
                                        <div className="flex gap-3">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${notice.isPinned ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg shadow-indigo-100' : 'bg-white text-indigo-600 border-slate-200'
                                                }`}>
                                                {notice.isPinned ? <Pin className="w-5 h-5 fill-white" /> : getCategoryIcon(notice.category)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-800 line-clamp-1">{notice.titleEng}</p>
                                                    {notice.isPinned === 1 && <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">Pinned</span>}
                                                </div>
                                                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                                    {notice.descriptionEng}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-2">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border capitalize ${getPriorityColor(notice.priority)}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                                {notice.priority} Priority
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Tag className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-wide">{notice.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="w-4 h-4 text-indigo-400" />
                                                <span className="text-sm font-semibold">{new Date(notice.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[11px]">{notice.author || 'Admin Staff'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(notice)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit Notice"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(notice.id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete Forever"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminNotices;
