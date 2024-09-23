import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_STYLIST_PASSWORD } from '../utils/mutations';
import { useAuth } from '../utils/auth';

const ChangeDefaultPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [updatePassword] = useMutation(UPDATE_STYLIST_PASSWORD);
  const { user, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      console.error('No user found or user email is missing');
      return;
    }
    try {
      const { data } = await updatePassword({
        variables: { email: user.email, password: newPassword }
      });
      if (data && data.updateStylistPassword) {
        const updatedUser = {
          ...user,
          isDefaultPassword: false
        };
        login(data.updateStylistPassword.token, updatedUser);
        alert("Thanks for updating your password!");
        window.location.reload();
      } else {
        console.error('No data returned from updatePassword mutation');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-4">Change Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangeDefaultPassword;