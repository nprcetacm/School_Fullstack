import React, { useState, useEffect } from 'react';
import {
    Users,
    UserPlus,
    Pencil,
    Trash2,
    X,
    Check,
    ChevronRight,
    Search,
    GraduationCap,
    Clock,
    Briefcase,
    PlusCircle
} from 'lucide-react';
import api from '../../api';

const AdminFaculty = () => {
    const [activeTab, setActiveTab] = useState('teachers');
    const [faculty, setFaculty] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        name: '', gender: 'Male', qual: '', role: '', subjects: '', class: '', exp: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchFaculty();
    }, [activeTab]);

    const fetchFaculty = async () => {
        setIsLoading(true);
        try {
            const endpoint = activeTab === 'teachers' ? '/faculty/teachers' : '/faculty/non-teaching';
            const res = await api.get(endpoint);
            setFaculty(res.data);
        } catch (err) {
            console.error('Error fetching faculty:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = activeTab === 'teachers' ? '/faculty/teachers' : '/faculty/non-teaching';

            if (isEditing) {
                await api.put(`${endpoint}/${editId}`, formData);
            } else {
                await api.post(endpoint, formData);
            }
            fetchFaculty();
            resetForm();
            setShowForm(false);
        } catch (err) {
            console.error('Error saving faculty:', err);
            const msg = err.response?.data?.message || err.response?.data?.msg || 'Failed to save faculty member. Please try again.';
            alert(msg);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            gender: item.gender,
            qual: item.qual,
            role: item.role,
            exp: item.exp ? item.exp.split('T')[0] : '',
            subjects: Array.isArray(item.subjects) ? item.subjects.join(', ') : item.subjects || '',
            class: item.class || ''
        });
        setIsEditing(true);
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this faculty member?')) {
            try {
                const endpoint = activeTab === 'teachers' ? '/faculty/teachers' : '/faculty/non-teaching';
                await api.delete(`${endpoint}/${id}`);
                fetchFaculty();
            } catch (err) {
                console.error('Error deleting faculty:', err);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', gender: 'Male', qual: '', role: '', subjects: '', class: '', exp: ''
        });
        setIsEditing(false);
        setEditId(null);
    };

    const filteredFaculty = faculty.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Faculty Management</h2>
                    <p className="text-slate-500 text-sm">Organize and manage school teaching and support staff.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                    {showForm ? <X className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {showForm ? 'Close Form' : 'Add New Member'}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            {isEditing ? <Pencil className="w-4 h-4 text-indigo-500" /> : <PlusCircle className="w-4 h-4 text-indigo-500" />}
                            {isEditing ? 'Update Faculty Details' : 'Register New Faculty Member'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Qualification</label>
                                <input
                                    name="qual"
                                    value={formData.qual}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. M.Sc, B.Ed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Designation / Role</label>
                                <input
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    placeholder={activeTab === 'teachers' ? "PGT / TGT" : "Clerk / Peon"}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Joined Date / Experience</label>
                                <input
                                    type="date"
                                    name="exp"
                                    value={formData.exp}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>

                            {activeTab === 'teachers' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Handled Subjects</label>
                                        <input
                                            name="subjects"
                                            value={formData.subjects}
                                            onChange={handleChange}
                                            placeholder="Maths, Science..."
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Class In-charge</label>
                                        <input
                                            name="class"
                                            value={formData.class}
                                            onChange={handleChange}
                                            placeholder="e.g. 10th-A"
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
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
                                {isEditing ? <Check className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                                {isEditing ? 'Update Member' : 'Add Member'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex bg-white p-1 rounded-xl shadow-inner border border-slate-200">
                        <button
                            onClick={() => { setActiveTab('teachers'); resetForm(); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'teachers'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Teachers
                        </button>
                        <button
                            onClick={() => { setActiveTab('non-teaching'); resetForm(); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'non-teaching'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Non-Teaching
                        </button>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
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
                                <th className="px-6 py-4">Full Member Name</th>
                                <th className="px-6 py-4">Designation</th>
                                <th className="px-6 py-4">Academic Background</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="font-medium">Loading faculty list...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredFaculty.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users className="w-12 h-12 text-slate-200" />
                                            <p className="font-medium text-slate-500">No faculty members found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredFaculty.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{item.name}</p>
                                                <p className="text-xs text-slate-400">{item.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Briefcase className="w-4 h-4 text-indigo-400" />
                                            <span className="text-sm font-semibold">{item.role}</span>
                                        </div>
                                        {item.class && (
                                            <span className="mt-1 inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                                                In-charge: {item.class}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <GraduationCap className="w-4 h-4 text-indigo-400" />
                                                <span className="text-sm font-medium">{item.qual}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-[11px]">{new Date(item.exp).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete"
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
                {!isLoading && filteredFaculty.length > 0 && (
                    <div className="p-4 bg-slate-50/30 border-t border-slate-50">
                        <p className="text-xs text-slate-400 font-medium italic">
                            Showing {filteredFaculty.length} members in {activeTab === 'teachers' ? 'teaching' : 'non-teaching'} category.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFaculty;
