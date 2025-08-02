import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide post content'],
        maxlength: [1000, 'Post cannot be more than 1000 characters'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
