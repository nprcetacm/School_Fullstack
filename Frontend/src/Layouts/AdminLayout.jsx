import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Bell,
    Image,
    Trophy,
    Star,
    LogOut,
    ChevronRight,
    School
} from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Faculty', path: '/admin/faculty', icon: Users },
        { name: 'Notices', path: '/admin/notices', icon: Bell },
        { name: 'Gallery', path: '/admin/gallery', icon: Image },
        { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
        { name: 'Toppers', path: '/admin/toppers', icon: Star },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-2xl z-30">
                <div className="p-6 flex items-center gap-3 border-b border-indigo-800">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <School className="w-6 h-6 text-indigo-300" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Admin CMS</h2>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                                        : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-400 group-hover:text-indigo-300'}`} />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-indigo-800 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800 capitalize">
                            {location.pathname.split('/').pop() || 'Overview'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            A
                        </div>
                        <span className="text-sm font-medium text-slate-600">Administrator</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
