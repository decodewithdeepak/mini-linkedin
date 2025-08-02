import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        await dbConnect();

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'name')
            .limit(50);

        return NextResponse.json({ posts });
    } catch (error: unknown) {
        console.error('Fetch posts error:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }

        const { content } = await request.json();
        if (!content || content.trim().length === 0) {
            return NextResponse.json(
                { message: 'Post content is required' },
                { status: 400 }
            );
        }

        // Get user info
        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Create post
        const post = await Post.create({
            content: content.trim(),
            author: user._id,
            authorName: user.name,
        });

        const populatedPost = await Post.findById(post._id).populate('author', 'name');

        return NextResponse.json(
            {
                message: 'Post created successfully',
                post: populatedPost,
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Create post error:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
