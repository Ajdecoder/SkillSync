import express from 'express';
import { bookmarkOpportunity, bookmarkTalents, unbookmarkOpportunity, unbookmarkTalents } from '../controller/user.profile.controller.js';

const BookmarRoutes = express.Router()

BookmarRoutes.put('/opportunity/job/bookmark-opportunity/', bookmarkOpportunity)
BookmarRoutes.delete('/opportunity/job/unbookmark-opportunity/', unbookmarkOpportunity)
BookmarRoutes.put('/talents/bookmark-talents/',bookmarkTalents)
BookmarRoutes.delete('/talents/unbookmark-talents/',unbookmarkTalents)


export default BookmarRoutes