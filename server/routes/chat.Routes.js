import express from 'express';
import { skillSyncAI } from '../chatbot/skillSyncAI.js';

const chaBotRouter = express.Router();

chaBotRouter.post('/chat-response', skillSyncAI);

export default chaBotRouter;
