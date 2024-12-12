import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";

const GetProfileData = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost/rent-easy/public/profile.php", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setProfileData(response.data.user);
        } else {
          console.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="text-center p-6 border-b dark:border-gray-700">
          <img
            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
            src={
              "https://via.placeholder.com/150" // Replace with actual profile image if available
            }
            alt="Profile"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
            {profileData.name || "N/A"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {profileData.address || "N/A"}
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">Phone:</span>
              <span className="text-gray-600 dark:text-gray-400">{profileData.phoneNumber || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">Gender:</span>
              <span className="text-gray-600 dark:text-gray-400">{profileData.gender || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">Email:</span>
              <span className="text-gray-600 dark:text-gray-400">{profileData.email || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">User Type:</span>
              <span className="text-gray-600 dark:text-gray-400">{profileData.userType || "N/A"}</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={open}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Edit Profile
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal opened={opened} close={close} />
    </div>
  );
};

export default GetProfileData;
