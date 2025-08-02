import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate token
        const token = generateToken(user._id.toString());

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
            },
        });
    } catch (error: unknown) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
