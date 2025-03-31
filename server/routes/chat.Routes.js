import express from 'express';
import { skillSyncAI } from '../controller/chat.controller.js';

const chaBotRouter = express.Router();

chaBotRouter.post('/chat-response', skillSyncAI);

export default chaBotRouter;
