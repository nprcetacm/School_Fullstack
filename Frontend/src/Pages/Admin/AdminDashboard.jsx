import React, { useState, useEffect } from 'react';
import {
    Users,
    Bell,
    Image as ImageIcon,
    Trophy,
    Star,
    ArrowUpRight,
    PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        faculty: 0,
        notices: 0,
        gallery: 0,
        achievements: 0,
        toppers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ft, fnt, n, g, a, t] = await Promise.all([
                    api.get('/faculty/teachers'),
                    api.get('/faculty/non-teaching'),
                    api.get('/notices'),
                    api.get('/gallery'),
                    api.get('/achievements'),
                    api.get('/toppers')
                ]);
                setStats({
                    faculty: ft.data.length + fnt.data.length,
                    notices: n.data.length,
                    gallery: g.data.length,
                    achievements: a.data.length,
                    toppers: t.data.length
                });
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { name: 'Faculty Members', count: stats.faculty, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/admin/faculty' },
        { name: 'Active Notices', count: stats.notices, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', link: '/admin/notices' },
        { name: 'Gallery Items', count: stats.gallery, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50', link: '/admin/gallery' },
        { name: 'Achievements', count: stats.achievements, icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/admin/achievements' },
        { name: 'Rank Holders', count: stats.toppers, icon: Star, color: 'text-rose-600', bg: 'bg-rose-50', link: '/admin/toppers' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
                    <p className="text-slate-500 mt-1">Quick summary of your school Management System.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.name}
                            to={card.link}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group"
                        >
                            <div className="flex items-start justify-between">
                                <div className={`${card.bg} ${card.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-slate-500 text-sm font-medium">{card.name}</h3>
                                <p className="text-3xl font-bold text-slate-800 mt-1">{card.count}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/admin/notices" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors group">
                            <PlusCircle className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-sm">Post New Notice</span>
                        </Link>
                        <Link to="/admin/gallery" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors group">
                            <PlusCircle className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-sm">Upload Photos</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">Welcome Back, Admin!</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                        You have full control over the school's digital presence. Manage your team, publish updates, and showcase student achievements from this unified dashboard.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider">
                            v2.0 Stable
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
