import React, { useState, useEffect } from 'react';
import {
    Image as ImageIcon,
    PlusCircle,
    Pencil,
    Trash2,
    X,
    Check,
    Upload,
    Calendar,
    Tag,
    FileText,
    Layers,
    Images,
    Maximize2,
    Search
} from 'lucide-react';
import api from '../../api';

const AdminGallery = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '', category: '', date: new Date().toISOString().split('T')[0], shortDescription: '', fullDescription: ''
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/gallery');
            setItems(res.data);
        } catch (err) {
            console.error('Error fetching gallery items:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagesPreview(previews);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            title: item.title,
            category: item.category,
            date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
            shortDescription: item.shortDescription || '',
            fullDescription: item.fullDescription || ''
        });
        setThumbnail(null);
        setThumbnailPreview(item.thumbnail);
        setImages([]);
        setImagesPreview([]);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({ title: '', category: '', date: new Date().toISOString().split('T')[0], shortDescription: '', fullDescription: '' });
        setThumbnail(null);
        setThumbnailPreview(null);
        setImages([]);
        setImagesPreview([]);
    };

    const handleCancelEdit = () => {
        setEditItem(null);
        resetForm();
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('date', formData.date);
        data.append('shortDescription', formData.shortDescription);
        data.append('fullDescription', formData.fullDescription);

        if (thumbnail) {
            data.append('thumbnail', thumbnail);
        }

        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            if (editItem) {
                await api.put(`/gallery/${editItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/gallery', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            fetchItems();
            handleCancelEdit();
        } catch (err) {
            console.error('Error saving gallery item:', err);
            const msg = err.response?.data?.message || err.response?.data?.msg || 'Failed to save gallery item. Please try again.';
            alert(msg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this gallery item and all its images?')) {
            try {
                await api.delete(`/gallery/${id}`);
                fetchItems();
            } catch (err) {
                console.error('Error deleting gallery item:', err);
            }
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Media Gallery Manager</h2>
                    <p className="text-slate-500 text-sm">Upload and manage school event photos and albums.</p>
                </div>
                <button
                    onClick={() => {
                        if (editItem) {
                            handleCancelEdit();
                        } else {
                            if (!showForm) resetForm();
                            setShowForm(!showForm);
                        }
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                    {showForm ? <X className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                    {showForm ? 'Cancel Operation' : 'Create New Album'}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            {editItem ? <Pencil className="w-4 h-4 text-indigo-500" /> : <ImageIcon className="w-4 h-4 text-indigo-500" />}
                            {editItem ? `Editing: ${editItem.title}` : 'Album Details & Media Upload'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Left Side: Metadata */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Album Title</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Annual Day 2024"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Category Tag</label>
                                        <input
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Events, Sports"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Event Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Short Summary</label>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
                                        required
                                        rows="2"
                                        placeholder="A brief catchy line for the album..."
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                                    <textarea
                                        name="fullDescription"
                                        value={formData.fullDescription}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        placeholder="Detailed story about the event..."
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Media Upload */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                                        <span>Cover Thumbnail</span>
                                        {editItem && <span className="text-[10px] text-indigo-500 uppercase">Optional to change</span>}
                                    </label>
                                    <div className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 h-[180px] flex flex-col items-center justify-center transition-all hover:border-indigo-400 hover:bg-slate-100/50">
                                        {thumbnailPreview ? (
                                            <div className="absolute inset-0">
                                                <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Upload className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center pointer-events-none">
                                                <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Cover Photo</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleThumbnailChange}
                                            accept="image/*"
                                            required={!editItem}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-700">More Media (Multi-select)</label>
                                    <div className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 min-h-[140px] flex flex-col items-center justify-center transition-all hover:border-indigo-400">
                                        <div className="p-6 flex flex-col items-center text-center">
                                            <Images className="w-8 h-8 text-slate-300 mb-2" />
                                            <p className="text-xs font-semibold text-slate-500">Drop additional story photos here</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Supports JPG, PNG (Max 10)</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImagesChange}
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    {imagesPreview.length > 0 && (
                                        <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl overflow-x-auto border border-slate-100">
                                            {imagesPreview.map((src, idx) => (
                                                <div key={idx} className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-white shadow-sm">
                                                    <img src={src} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="w-12 h-12 flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">
                                                +{imagesPreview.length}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-2.5 rounded-2xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 active:scale-95"
                            >
                                {editItem ? <Check className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                                {editItem ? 'Save Changes' : 'Publish Album'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200">
                            <Layers className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Media Library</h3>
                            <p className="text-xs text-slate-400 font-medium">Manage your school visual assets</p>
                        </div>
                    </div>

                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find albums by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="p-8">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <span className="font-bold uppercase tracking-widest text-xs">Accessing Gallery Records...</span>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <Images className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Your gallery is quiet.</h3>
                            <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">Upload event photos to showcase school activities and achievements.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredItems.map(item => (
                                <div key={item.id} className="group relative bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                            <div className="flex gap-2 w-full">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="flex-1 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-bold text-xs hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Pencil className="w-3 h-3" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="flex-1 py-2 bg-rose-500/20 backdrop-blur-md rounded-xl text-rose-100 font-bold text-xs hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-3 h-3 text-indigo-500" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <h3 className="font-black text-slate-800 text-lg line-clamp-1 mb-1">{item.title}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.shortDescription}</p>
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

export default AdminGallery;
