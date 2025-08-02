'use client';

import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 1);
    const [commentCount] = useState(Math.floor(Math.random() * 10));
    const [shareCount] = useState(Math.floor(Math.random() * 5));
    const [saved, setSaved] = useState(false);

    const authorId = post.author?._id || post.author;
    const authorName = post.author?.name || post.authorName;

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };

    const handleSave = () => {
        setSaved(!saved);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-3">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {authorName.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                            <Link
                                href={`/profile/${authorId}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                            >
                                {authorName}
                            </Link>
                            <span className="text-blue-600">•</span>
                            <span className="text-sm text-gray-500">1st</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            Professional at Mini LinkedIn
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                            <span className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">🌐</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleSave}
                        className={`p-2 rounded-full transition-colors ${saved
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Bookmark size={18} className={saved ? 'fill-current' : ''} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-3">
                <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </div>
            </div>

            {/* Engagement Stats */}
            <div className="px-6 py-2 border-t border-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                        {likeCount > 0 && (
                            <span className="flex items-center space-x-1">
                                <div className="flex -space-x-1">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <Heart size={10} className="text-white fill-current" />
                                    </div>
                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">👍</span>
                                    </div>
                                </div>
                                <span>{likeCount}</span>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {commentCount > 0 && (
                            <span>{commentCount} comment{commentCount !== 1 ? 's' : ''}</span>
                        )}
                        {shareCount > 0 && (
                            <span>{shareCount} share{shareCount !== 1 ? 's' : ''}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${liked
                                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Heart size={18} className={liked ? 'fill-current' : ''} />
                        <span className="font-medium">Like</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageCircle size={18} />
                        <span className="font-medium">Comment</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Repeat2 size={18} />
                        <span className="font-medium">Repost</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Send size={18} />
                        <span className="font-medium">Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
