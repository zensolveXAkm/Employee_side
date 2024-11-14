import React, { useEffect, useState } from 'react';
import { databases, ID } from '../AppwriteConfig';
import { useUser } from './user';
import { Query } from 'appwrite';

const Profile = () => {
  const { current } = useUser();
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    pan: '',
    address: ''
  });
  const [documentId, setDocumentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user's profile data from Appwrite database
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await databases.listDocuments(
          '6730c1950007c16da598',
          'profiles',
          [Query.equal('email', current?.email)]
        );

        if (profile.documents.length > 0) {
          const userProfile = profile.documents[0];
          setDocumentId(userProfile.$id);
          setProfileData({
            name: userProfile.name,
            phone: userProfile.phone,
            aadhar: userProfile.aadhar,
            pan: userProfile.pan,
            address: userProfile.address
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to load profile.');
        setLoading(false);
      }
    };

    if (current?.email) {
      fetchProfile();
    }
  }, [current]);

  // Handle profile data update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (documentId) {
        await databases.updateDocument(
          '6730c1950007c16da598',
          'profiles',
          documentId,
          profileData
        );
        setSuccessMessage('Profile updated successfully!');
      } else {
        setErrorMessage('Profile not found.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-lg p-4 bg-white shadow-md rounded">
      <h3 className="text-center text-xl font-bold mb-4">Edit Profile</h3>

      {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-2">{errorMessage}</p>}

      {/* Profile Edit Form */}
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Full Name"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          className="border p-2 my-2 w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          className="border p-2 my-2 w-full"
        />
        <input
          type="text"
          placeholder="Aadhar Number"
          value={profileData.aadhar}
          onChange={(e) => setProfileData({ ...profileData, aadhar: e.target.value })}
          className="border p-2 my-2 w-full"
        />
        <input
          type="text"
          placeholder="PAN Number"
          value={profileData.pan}
          onChange={(e) => setProfileData({ ...profileData, pan: e.target.value })}
          className="border p-2 my-2 w-full"
        />
        <textarea
          placeholder="Address"
          value={profileData.address}
          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
          className="border p-2 my-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
