'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import LandingPage from '@/components/LandingPage';

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

export default function Home() {
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="px-6 pb-6">
                <div className="flex flex-col items-center -mt-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600 text-center mt-1">{user.bio || 'Professional at Mini LinkedIn'}</p>
                  <div className="mt-4 w-full">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Profile views</span>
                        <span className="font-semibold text-blue-600">42</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Post impressions</span>
                        <span className="font-semibold text-blue-600">128</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">📊 My Analytics</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">🔖 Saved Posts</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">👥 My Network</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">📝 Draft Posts</a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Welcome Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
                  <p className="text-gray-600">Ready to share your insights with the community?</p>
                </div>
              </div>
            </div>

            <CreatePost onPostCreated={fetchPosts} />

            {/* Posts Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Latest from your network</h2>
                <select className="text-sm border text-gray-700 border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                  <option>Recent</option>
                  <option>Most liked</option>
                  <option>Most commented</option>
                </select>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                      <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center">
                  <div className="text-6xl mb-4">😕</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={fetchPosts}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share something with the community!</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Create Your First Post
                  </button>
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
        </div>
      </main>
    </div>
  );
}
