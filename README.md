# MiniLinkedIn - Professional Community Platform

A mini LinkedIn-like community platform built with Next.js, TypeScript, MongoDB, and Tailwind CSS. This application allows users to register, login, create posts, and view profiles in a professional social networking environment.

## 🚀 Live Demo

[Live Demo URL](https://your-deployed-app.vercel.app) (Update this with your actual deployment URL)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## ✨ Features

### 🔐 User Authentication

- User registration with name, email, password, and optional bio
- Secure login/logout functionality
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes

### 📝 Posts Management

- Create text-only posts (up to 1000 characters)
- View all posts in a chronological feed
- Display author name and timestamp for each post
- Real-time post creation and updates

### 👤 User Profiles

- View user profiles with their information
- Display user's posts on their profile page
- Show user statistics (post count, join date)
- Profile navigation from navbar

### 🎨 User Interface

- Clean, professional design inspired by LinkedIn
- Responsive layout for mobile and desktop
- Intuitive navigation with navbar
- Loading states and error handling
- Modern card-based UI components

## 🏗️ Project Structure

```
mini-linkedin/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── posts/route.ts
│   │   └── users/[id]/route.ts
│   ├── auth/page.tsx
│   ├── profile/[id]/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthForms.tsx
│   ├── CreatePost.tsx
│   ├── Navbar.tsx
│   └── PostCard.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── auth.ts
│   └── mongodb.ts
├── models/
│   ├── Post.ts
│   └── User.ts
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mini-linkedin.git
   cd mini-linkedin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Update the variables in `.env.local`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/mini-linkedin
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up MongoDB**

   **Option A: Local MongoDB**

   - Install MongoDB locally
   - Start MongoDB service
   - Use: `mongodb://localhost:27017/mini-linkedin`

   **Option B: MongoDB Atlas (Recommended)**

   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace `MONGODB_URI` in `.env.local`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open the application**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Getting Started

1. Navigate to `/auth` to register a new account
2. Fill in your name, email, password, and optional bio
3. After registration, you'll be automatically logged in
4. Start creating posts and exploring the platform!

### Demo Users

For testing purposes, you can create demo accounts:

**Demo User 1:**

- Name: John Doe
- Email: john@example.com
- Password: password123
- Bio: Software Developer passionate about creating amazing web applications

**Demo User 2:**

- Name: Jane Smith
- Email: jane@example.com
- Password: password123
- Bio: UI/UX Designer with a love for clean and intuitive interfaces

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Connect to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Set Environment Variables in Vercel**

   ```
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-production-jwt-secret
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**
   - Vercel will automatically deploy your app
   - Your app will be available at `https://your-app-name.vercel.app`

### Alternative Deployment Options

- **Netlify**: Can be deployed with some configuration for API routes
- **Railway**: Good for full-stack applications
- **Render**: Free tier available for small projects

## 🧪 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (requires authentication)

### Users

- `GET /api/users/[id]` - Get user profile and their posts

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

This project uses:

- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- Prettier for code formatting (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for CIAAN Cyber Tech Pvt Ltd Full Stack Development Internship
- Inspired by LinkedIn's design and functionality
- Thanks to the open-source community for the amazing tools and libraries

## 📞 Contact

- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
- **LinkedIn**: [your-linkedin](https://linkedin.com/in/your-profile)

---

**Note**: This is a demo application built for educational/interview purposes. Not intended for production use without additional security measures and optimizations.
