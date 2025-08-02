'use client';

import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import Link from 'next/link';

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
    const authorId = post.author?._id || post.author;
    const authorName = post.author?.name || post.authorName;

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                        <Link
                            href={`/profile/${authorId}`}
                            className="font-medium text-gray-900 hover:text-blue-600"
                        >
                            {authorName}
                        </Link>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </span>
                    </div>

                    <div className="text-gray-900 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
}
