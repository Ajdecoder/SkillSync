import dotenv from 'dotenv';
dotenv.config();

export const PostBlog = async (req, res) => {
    const { title, content, date, author, excerpt, image } = req.body;
    try {
        const newBlog = new Blogs({ title, content, date, author, excerpt, image });
        await newBlog.save();
        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
}