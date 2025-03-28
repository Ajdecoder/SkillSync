import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { BookmarkedOpportunity } from './BookmarkedOpportunity';
import { LoginPromoPage } from '../../Login/NotLoggedIn';

export const AllBookmarks = () => {
    const { loggedInUser, googleUser } = useAuth();

    const currentUser = loggedInUser || googleUser;
  
    return currentUser?.role==='recruiter' ? <BookmarkedOpportunity /> : <LoginPromoPage />;
  
}
