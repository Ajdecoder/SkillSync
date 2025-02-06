import express from 'express';
import { bookmarkOpportunity, unbookmarkOpportunity } from '../controller/user.profile.controller.js';

const BookmarRoutes = express.Router()

BookmarRoutes.put('/opportunity/job/bookmark-opportunity/', bookmarkOpportunity)
BookmarRoutes.delete('/opportunity/job/unbookmark-opportunity/', unbookmarkOpportunity)
BookmarRoutes.put('/talents/addBookmark')
BookmarRoutes.delete('/talents/removeBookmark')


export default BookmarRoutes