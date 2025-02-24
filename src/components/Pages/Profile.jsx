import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import { Tabs } from "@mantine/core";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../stores/useBookingStore';
import { Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import {  Card, Group, Text, Title, Badge, Rating } from '@mantine/core';
import { toast } from 'react-hot-toast';

const GetProfileData = () => {
  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]); // State to store properties


  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost/rent-easy/public/profile.php/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.data.success) {
          setProfileData(response.data.user); // Store user profile data
          setProperties(response.data.properties || []); // Store properties if available
          console.log("Profile Data Set:", response.data.user);
          console.log("Properties Data Set:", response.data.properties);
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
        <p className="text-lg font-semibold text-red-500">
          No profile data found.
        </p>
      </div>
    );
  }
  console.log(profileData.image);

  return (
    <div className=" bg-white p-6 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        My Dashboard
      </h1>

      <Tabs
        color="teal"
        defaultValue="first"
        className="max-w-4xl mx-auto bg-white shadow-md rounded-xl"
      >
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">
            My Profile
          </Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">
            My Properties
          </Tabs.Tab>
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
                <div className=" text-sm font-medium text-gray-700 dark:text-white ">
                  Name:
                </div>
                <div className=" text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {profileData.name || "N/A"}
                </div>
              </div>
              <div className="flex mt-4 items-center justify-center">
                <div className=" text-sm font-medium text-gray-700 dark:text-white">
                  Address:
                </div>

                <p className=" text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {profileData.address || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex  flex-wrap justify-between p-10">
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone:
                </span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.phoneNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender:
                </span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.gender || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email:
                </span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.email || "N/A"}
                </span>
              </div>
              <div>
                <span className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Type:
                </span>
                <span className=" text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.userType || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" mt="lg" onClick={open}>
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
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-6xl"
    >
      <div className="space-y-6">
      {properties.map((property) => (
          <Card key={property.id} shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Property Image */}
              <div className="w-full md:w-1/4">
                <img
                  src={property.images?.[0] || "/default-property.jpg"}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Group>
                      <Title order={3}>{property.title}</Title>
                    </Group>
                    <Text color="dimmed" className="mt-2">
                      {property.description}
                    </Text>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Text size="sm" color="dimmed">Price</Text>
                    <Text weight={600}>{property.price}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Location</Text>
                    <Text weight={600}>
                      {property.city}, {property.country}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Size</Text>
                    <Text weight={600}>{property.dimension} sqft</Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Uploaded On</Text>
                    <Text weight={600}>
                      {moment(property.uploaded_at).format("MMM DD, YYYY")}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      
    </motion.div>
  </div>
</Tabs.Panel>

      </Tabs>
    </div>
  );
};

export default GetProfileData;
