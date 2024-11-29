import React, { useState } from 'react';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email changed to:', newEmail);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Change Email Address</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="new-email" className="block">New Email Address</label>
          <input
            type="email"
            id="new-email"
            name="new-email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter new email address"
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Change Email
        </button>
      </form>
    </div>
  );
};

export default ChangeEmail;
