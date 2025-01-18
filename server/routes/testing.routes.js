import express from 'express';
import { createOpportunity, createUserProfile } from '../controller/testing/testing.controller.js';

const testingRouter = express.Router();

testingRouter.get('/greet', (req, res) => {
  res.json({ message: 'This is the testing route' });
});

testingRouter.post('/candidateprofile',createOpportunity)
testingRouter.post('/candidateprofile',createUserProfile)

export default testingRouter