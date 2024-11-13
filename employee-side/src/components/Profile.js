// src/components/ProfileCard.js
import React, { useEffect, useState } from 'react';
import { account } from '../AppwriteConfig'; // Appwrite configuration file

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);

  // Fetch the logged-in user profile information
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get(); // Fetch current logged-in user data from Appwrite
        setProfile({
          name: user.name || 'No Name',
          email: user.email || 'No Email',
          phone: user.phone || 'No Phone',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border">
      <h3 className="text-lg font-semibold text-center mb-4">User Profile</h3>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
