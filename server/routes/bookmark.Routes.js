import express from 'express';
import { bookmarkOpportunity, bookmarkTalents, unbookmarkOpportunity, unbookmarkTalents } from '../controller/user.profile.controller.js';
import verifyUser from '../middleware/auth.js';

const BookmarRoutes = express.Router()

BookmarRoutes.put('/opportunity/job/bookmark-opportunity/', verifyUser, bookmarkOpportunity)
BookmarRoutes.delete('/opportunity/job/unbookmark-opportunity/', verifyUser, unbookmarkOpportunity)
BookmarRoutes.put('/talents/bookmark-talents/', verifyUser, bookmarkTalents)
BookmarRoutes.delete('/talents/unbookmark-talents/', verifyUser, unbookmarkTalents)


export default BookmarRoutes