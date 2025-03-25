import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { BookmarkedOpportunity } from './BookmarkedOpportunity';
import { LoginPromoPage } from '../../Login/NotLoggedIn';

export const AllBookmarks = () => {
    const { loggedInUser, google_user } = useAuth();

    const currentUser = loggedInUser || google_user;
  
    return currentUser?.role==='recruiter' ? <BookmarkedOpportunity /> : <LoginPromoPage />;
  
}
