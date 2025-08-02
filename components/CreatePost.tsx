'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Image, Video, Calendar, Smile } from 'lucide-react';

interface CreatePostProps {
    onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { token, user } = useAuth();

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
            setIsExpanded(false);
            if (onPostCreated) {
                onPostCreated();
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div
                        className="flex-1 bg-gray-50 rounded-full px-4 py-3 cursor-text transition-all hover:bg-gray-100"
                        onClick={() => setIsExpanded(true)}
                    >
                        <span className="text-gray-500">
                            {isExpanded ? '' : 'Share your thoughts...'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What would you like to share with your network?"
                            rows={4}
                            className="w-full px-0 py-2 border-0 resize-none focus:outline-none text-gray-900 bg-white placeholder-gray-500 text-lg"
                            maxLength={3000}
                            autoFocus
                        />
                        <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <button
                                    type="button"
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Add image"
                                >
                                    <Image size={20} />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Add video"
                                >
                                    <Video size={20} />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    title="Add event"
                                >
                                    <Calendar size={20} />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                    title="Add emoji"
                                >
                                    <Smile size={20} />
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                {content.length}/3,000
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsExpanded(false);
                                setContent('');
                                setError('');
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !content.trim()}
                            className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
                        >
                            <Send size={16} />
                            <span>{loading ? 'Posting...' : 'Post'}</span>
                        </button>
                    </div>
                </form>
            )}

            {/* Quick Actions (when not expanded) */}
            {!isExpanded && (
                <div className="px-6 pb-4">
                    <div className="flex justify-between">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Image size={20} className="text-blue-600" />
                            <span className="text-sm font-medium">Photo</span>
                        </button>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Video size={20} className="text-green-600" />
                            <span className="text-sm font-medium">Video</span>
                        </button>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Calendar size={20} className="text-purple-600" />
                            <span className="text-sm font-medium">Event</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
