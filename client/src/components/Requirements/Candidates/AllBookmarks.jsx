import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { BookmarkedOpportunity } from './BookmarkedOpportunity';
import { LoginPromoPage } from '../../Login/NotLoggedIn';

export const AllBookmarks = () => {
    const { loggedInUser, googleUser } = useAuth();

    const currentUser = loggedInUser || googleUser;
    console.log(currentUser)
  
    return currentUser?.role==='candidate' ? <BookmarkedOpportunity /> : <LoginPromoPage />;
  
}
