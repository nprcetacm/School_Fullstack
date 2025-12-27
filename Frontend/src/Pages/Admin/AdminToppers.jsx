import React, { useState, useEffect } from 'react';
import {
    Star,
    UserPlus,
    Pencil,
    Trash2,
    X,
    Check,
    Search,
    GraduationCap,
    TrendingUp,
    ShieldCheck,
    Users,
    ChevronDown,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import api from '../../api';

const AdminToppers = () => {
    const [toppers, setToppers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        std: '', name: '', group: '', score: '', outOf: '', rank: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchToppers();
    }, []);

    const fetchToppers = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/toppers');
            setToppers(res.data);
        } catch (err) {
            console.error('Error fetching toppers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            std: item.std,
            name: item.name,
            group: item.group,
            score: item.score,
            outOf: item.outOf,
            rank: item.rank
        });
        setImage(null);
        setImagePreview(item.image);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditItem(null);
        setFormData({ std: '', name: '', group: '', score: '', outOf: '', rank: '' });
        setImage(null);
        setImagePreview(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) {
            data.append('image', image);
        }

        try {
            if (editItem) {
                await api.put(`/toppers/${editItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/toppers', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchToppers();
            handleCancelEdit();
        } catch (err) {
            console.error('Error saving topper:', err);
            const msg = err.response?.data?.message || err.response?.data?.msg || 'Failed to save topper record. Please try again.';
            alert(msg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this topper from the hall of fame?')) {
            try {
                await api.delete(`/toppers/${id}`);
                fetchToppers();
            } catch (err) {
                console.error('Error deleting topper:', err);
            }
        }
    };

    const filteredToppers = toppers.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.std.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Academic Hall of Fame</h2>
                    <p className="text-slate-500 text-sm">Manage student toppers and record breakers across all standards.</p>
                </div>
                <button
                    onClick={() => { editItem ? handleCancelEdit() : setShowForm(!showForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                    {showForm ? <X className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {showForm ? 'Cancel Entry' : 'Add New Topper'}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            {editItem ? <Pencil className="w-4 h-4 text-indigo-500" /> : <Star className="w-4 h-4 text-indigo-500" />}
                            {editItem ? `Updating Record: ${editItem.name}` : 'New Topper Registration'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Student Info */}
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-indigo-500" /> Standard
                                    </label>
                                    <select
                                        name="std"
                                        value={formData.std}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
                                    >
                                        <option value="">Select Class</option>
                                        <option value="10">Class 10</option>
                                        <option value="11">Class 11</option>
                                        <option value="12">Class 12</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Student's name"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Group / Track</label>
                                    <input
                                        name="group"
                                        value={formData.group}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Science, Commerce"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-indigo-500" /> Score
                                        </label>
                                        <input
                                            type="number"
                                            name="score"
                                            value={formData.score}
                                            onChange={handleChange}
                                            required
                                            placeholder="Obtained"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Out Of</label>
                                        <input
                                            type="number"
                                            name="outOf"
                                            value={formData.outOf}
                                            onChange={handleChange}
                                            required
                                            placeholder="Total"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-indigo-500" /> Achievement Rank
                                    </label>
                                    <input
                                        type="number"
                                        name="rank"
                                        value={formData.rank}
                                        onChange={handleChange}
                                        required
                                        placeholder="State/School Rank"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700">Student Profile Image</label>
                                <div className="relative group rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 h-[300px] flex flex-col items-center justify-center transition-all hover:border-indigo-400 overflow-hidden">
                                    {imagePreview ? (
                                        <div className="absolute inset-0">
                                            <img src={imagePreview} alt="Student Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                                    <Star className="w-8 h-8 text-white fill-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                                                <ImageIcon className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Upload Profile</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required={!editItem}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-2.5 rounded-2xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 active:scale-95"
                            >
                                {editItem ? <Check className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                                {editItem ? 'Update Hall of Fame' : 'Register Topper'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* View Table Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Topper Registry</h3>
                            <p className="text-xs text-slate-400 font-medium">Monitoring academic excellence</p>
                        </div>
                    </div>

                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find student by name or class..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-[0.15em] font-black border-b border-slate-100">
                                <th className="px-8 py-5">Academician</th>
                                <th className="px-8 py-5 text-center">Standard</th>
                                <th className="px-8 py-5 text-center">Score Profile</th>
                                <th className="px-8 py-5 text-center">Standing</th>
                                <th className="px-8 py-5 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                            <span className="font-black uppercase tracking-widest text-xs text-slate-400">Loading Registry...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredToppers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400">
                                        <p className="font-bold italic">No topper records registered in the archive.</p>
                                    </td>
                                </tr>
                            ) : filteredToppers.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-base">{item.name}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.group}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg border border-indigo-100 shadow-sm shadow-indigo-100/50">
                                            Class {item.std}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-slate-800">{item.score} / {item.outOf}</p>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full"
                                                    style={{ width: `${(item.score / item.outOf) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="inline-flex items-center gap-2 text-amber-600">
                                            <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-100">
                                                <Star className="w-3 h-3 fill-amber-600" />
                                            </div>
                                            <span className="text-sm font-black tracking-tight">Rank #{item.rank}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                title="Edit Entry"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                title="Remove Permanently"
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

export default AdminToppers;
