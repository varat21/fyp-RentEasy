import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import { Tabs } from '@mantine/core';
import {

  Button
} from "@mantine/core";
import { CiUser } from "react-icons/ci";


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
        const response = await axios.get("http://localhost/rent-easy/public/profile.php/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(response);
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-red-500">No profile data found.</p>
      </div>
    );
  }
  console.log(profileData.image);

  return (
    <div className=" bg-white p-6 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">My Dashboard</h1>

      <Tabs color="teal" defaultValue="first" className="max-w-4xl mx-auto bg-white shadow-md rounded-xl">
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">My Profile</Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">My Properties</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" pt="xs">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
             
            {profileData.image ? (
  <img
    src={profileData.image}
    alt="User Profile"
    className="w-32 h-32 mx-auto rounded-full border-4 border-black"
  />
) : (
  <CiUser className="w-32 h-32 mx-auto rounded-full border-4 border-black" />
)}

        
              <div className="flex mt-4 items-center justify-center">
              <div className=" text-sm font-medium text-gray-700 dark:text-white ">Name:</div>
              <div className=" text-lg font-semibold text-gray-800 dark:text-white capitalize">

              {profileData.name || "N/A"}
              </div>
              </div>
              <div className="flex mt-4 items-center justify-center">
              <div className=" text-sm font-medium text-gray-700 dark:text-white">Address:</div>
      
              <p className=" text-lg font-semibold text-gray-800 dark:text-white capitalize">
                {profileData.address || "N/A"}
              </p>
              </div>
            </div>

            <div className="flex  flex-wrap justify-between p-10">
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.phoneNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">Gender:</span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.gender || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.email || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">User Type:</span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.userType || "N/A"}
                </span>
              </div>
            </div>
       
            <div className="flex justify-end space-x-4">



                          <Button  type="submit" mt="lg"
              
            
                onClick={open}>
                Edit Profile
              </Button>
            
            </div>
          </div>

          {/* Profile Edit Modal */}
          <ProfileEditModal
            opened={opened}
            close={close}
            name={profileData.name}
            address={profileData.address}
            phoneNumber={profileData.phoneNumber}
            gender={profileData.gender}
            password={profileData.password}
            id={profileData.id}
            email={profileData.email}
          />
        </Tabs.Panel>

        <Tabs.Panel value="second" pt="xs">
          <div className="p-6 bg-gray-50 text-center text-gray-700 font-semibold">
            This tab will display My Properties data.
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default GetProfileData;
