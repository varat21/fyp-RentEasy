import React from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";

const GetProfileData = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="text-center p-6 border-b dark:border-gray-700">
          <img
            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
            src="https://randomuser.me/api/portraits/women/21.jpg"
            alt="Profile"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
            Cait Genevieve
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New York, NY
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Phone:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                9847502403
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Gender:
              </span>
              <span className="text-gray-600 dark:text-gray-400">Female</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Email:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                thapavarat@yahoo.com
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Password:
              </span>
              <span className="text-gray-600 dark:text-gray-400">*******</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                User Type:
              </span>
              <span className="text-gray-600 dark:text-gray-400">User</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={open}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Edit Profile
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
              Delete
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
