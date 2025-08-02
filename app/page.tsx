'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Share your thoughts with the community</p>
        </div>

        <CreatePost onPostCreated={fetchPosts} />

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading posts...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600">{error}</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">No posts yet. Be the first to share something!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
