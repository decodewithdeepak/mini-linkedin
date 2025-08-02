import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const user = await User.findById(params.id).select('-password');
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const posts = await Post.find({ author: params.id })
            .sort({ createdAt: -1 })
            .populate('author', 'name');

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                createdAt: user.createdAt,
            },
            posts,
        });
    } catch (error: any) {
        console.error('Fetch user profile error:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
