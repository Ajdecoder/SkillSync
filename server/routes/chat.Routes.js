import express from 'express';
import { skillSyncAI } from '../chatbot/skillSyncAI.js';
import verifyUser from '../middleware/auth.js';

const chaBotRouter = express.Router();

chaBotRouter.post('/chat-response', skillSyncAI);

export default chaBotRouter;
