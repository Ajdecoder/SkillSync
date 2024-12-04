import express from 'express';
import { chatResponse } from '../controller/chat.controller.js';

const chaBotRouter = express.Router();

chaBotRouter.post('/chat-response', chatResponse);

export default chaBotRouter;
