'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    if (!user) return null;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">MiniLinkedIn</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </Link>

                        <Link
                            href={`/profile/${user.id}`}
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <User size={20} />
                            <span>Profile</span>
                        </Link>

                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
