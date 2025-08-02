'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowUp } from 'lucide-react';

interface CreatePostProps {
    onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setContent('');
            if (onPostCreated) {
                onPostCreated();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind? Share your thoughts..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        maxLength={1000}
                    />
                    <div className="mt-1 text-right">
                        <span className="text-sm text-gray-500">
                            {content.length}/1000
                        </span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowUp size={16} />
                        <span>{loading ? 'Posting...' : 'Post'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
