import express from 'express';
import { PostBlog } from '../controller/blogs/blogs.controller';
import verifyUser from '../middleware/auth';

const chaBotRouter = express.Router();

chaBotRouter.post('/post-blog', verifyUser, PostBlog);

export default chaBotRouter;
