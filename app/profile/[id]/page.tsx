'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { User, Calendar, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string;
    createdAt: string;
}

interface Post {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
    };
    authorName: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { user: currentUser, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !currentUser) {
            router.push('/auth');
        }
    }, [currentUser, authLoading, router]);

    useEffect(() => {
        if (currentUser && userId) {
            fetchProfile();
        }
    }, [currentUser, userId]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setProfile(data.user);
                setPosts(data.posts);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-6">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-gray-500">Loading profile...</div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <div className="text-red-600">{error}</div>
                    </div>
                ) : profile ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Info */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User size={40} className="text-gray-600" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                                    {profile.bio && (
                                        <p className="text-gray-600 mt-2">{profile.bio}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Mail size={16} />
                                        <span className="text-sm">{profile.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span className="text-sm">
                                            Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                                        <div className="text-sm text-gray-600">Posts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                {currentUser.id === userId ? 'Your Posts' : `${profile.name}'s Posts`}
                            </h2>

                            {posts.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-500">
                                        {currentUser.id === userId ? "You haven't posted anything yet." : "No posts to show."}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </main>
        </div>
    );
}
