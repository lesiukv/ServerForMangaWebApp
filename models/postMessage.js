import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    parodie: String,
    tags: [String],
    artists: [String],
    group: String,
    language: String,
    category: String,
    titleImage: String,
    pages: [String],
    likeCount: {
        type: Number, 
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;