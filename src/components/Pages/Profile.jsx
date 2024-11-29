import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetProfileData = () => {
  const [profileData, setProfileData] = useState(null); // State to store profile data

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token'); // Ensure token is properly formatted
      console.log('Token:', token); // Log the token here

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,  // Corrected this line
        };

        const response = await axios.get('http://localhost/rent-easy/public/profile.php', { headers });
        console.log(response);

        if (response.data.success) {
          console.log('Profile data:', response.data);
          setProfileData(response.data.users); // Store users data correctly in state
        } else {
          console.error('Failed to fetch profile data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
        <>
          <p>Welcome, {profileData?.name}</p> {/* Use profileData here */}
          console.log(profileData);
          <p>Phone Number: {profileData?.phoneNumber}</p>
          <p>User Type: {profileData?.usersType}</p> {/* Corrected this to match the key */}
        </>
      
      
    </div>
  );
};

export default GetProfileData;
