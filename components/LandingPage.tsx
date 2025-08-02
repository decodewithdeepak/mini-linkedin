'use client';

import { useState } from 'react';
import { Users, MessageSquare, UserCheck, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">MiniLinkedIn</span>
                        </div>
                        <Link
                            href="/auth"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                            Connect with
                            <span className="text-blue-600 block">Professionals</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Join our professional community platform where you can share insights,
                            connect with like-minded individuals, and grow your professional network.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/auth"
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                            >
                                Join Now - It's Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background decorations */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-100 rounded-full opacity-30 animate-bounce"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                            Everything you need to grow professionally
                        </h2>
                        <p className="text-lg text-gray-600">
                            Simple, powerful tools to help you connect and share with your professional network
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect with Professionals</h3>
                            <p className="text-gray-600">
                                Build meaningful connections with professionals in your industry and expand your network.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Thoughts</h3>
                            <p className="text-gray-600">
                                Post updates, share insights, and engage with your professional community.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Profiles</h3>
                            <p className="text-gray-600">
                                Create a compelling profile that showcases your experience and expertise.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                            <div className="text-gray-600">Active Professionals</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                            <div className="text-gray-600">Posts Shared</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                            <div className="text-gray-600">Free to Use</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                                Why choose MiniLinkedIn?
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Simple & Intuitive</h3>
                                        <p className="text-gray-600">Easy-to-use interface designed for professionals</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                                        <p className="text-gray-600">Your data is protected with industry-standard security</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Always Free</h3>
                                        <p className="text-gray-600">No hidden fees, no premium plans - completely free</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Mobile Responsive</h3>
                                        <p className="text-gray-600">Access from any device, anywhere, anytime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                            <div className="text-center">
                                <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to get started?</h3>
                                <p className="text-gray-600 mb-6">
                                    Join thousands of professionals who are already using MiniLinkedIn to grow their careers.
                                </p>
                                <Link
                                    href="/auth"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Create Your Account
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4">
                        Start building your professional network today
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        It only takes a minute to get started. Join now and connect with professionals worldwide.
                    </p>
                    <Link
                        href="/auth"
                        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                    >
                        Get Started Now
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="text-xl font-bold text-white">MiniLinkedIn</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Built for CIAAN Cyber Tech Pvt Ltd Full Stack Development Internship
                        </p>
                        <p className="text-gray-500 text-sm">
                            © 2025 MiniLinkedIn. A demo application for educational purposes.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
