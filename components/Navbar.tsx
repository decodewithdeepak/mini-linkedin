'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home, Search, MessageSquare, Bell, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    if (!user) return null;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Search */}
                    <div className="flex items-center space-x-4 flex-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">in</span>
                            </div>
                        </Link>

                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group"
                        >
                            <Home size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-1 font-medium">Home</span>
                        </Link>

                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group">
                            <Users size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-1 font-medium">Network</span>
                        </button>

                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group">
                            <Briefcase size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-1 font-medium">Jobs</span>
                        </button>

                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group relative">
                            <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-1 font-medium">Messaging</span>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </button>

                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors group relative">
                            <Bell size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-1 font-medium">Notifications</span>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </button>

                        {/* Profile Section - Integrated in Header */}
                        <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                    <div className="text-xs text-gray-600">{user.email}</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <User size={16} />
                                    <span className="hidden sm:inline text-sm">Profile</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden sm:inline text-sm">Sign out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {showProfileMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                ></div>
            )}
        </nav>
    );
}
