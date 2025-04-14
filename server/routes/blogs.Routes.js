import express from 'express';
import { PostBlog } from '../controller/blogs/blogs.controller';

const chaBotRouter = express.Router();

chaBotRouter.post('/post-blog', PostBlog);

export default chaBotRouter;
