import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { name, email, password, bio } = await request.json();

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            bio: bio || '',
        });

        // Generate token
        const token = generateToken(user._id.toString());

        return NextResponse.json(
            {
                message: 'User created successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Registration error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}
