import React, { useState } from 'react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic
    if (newPassword === confirmPassword) {
      console.log('Password changed successfully');
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="new-password" className="block">New Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
