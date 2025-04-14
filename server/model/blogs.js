import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://www.staffingsoft.com/wp-content/uploads/2018/01/contract-staffing.png"
    },
    content: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default blogSchema;