import React, { useState } from 'react';

export const AccountSettings = () => {

    

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',  // Example user data
    email: 'johndoe@example.com',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., update the user info
    console.log('Updated User Info:', userInfo);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Account Settings</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-lg">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-lg">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-lg">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            placeholder="Enter a new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-lg">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          className="py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          onClick={() => console.log('Account deleted')}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};
