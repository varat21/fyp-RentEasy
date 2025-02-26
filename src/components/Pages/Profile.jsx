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
import {  Card, Group,  Title, Badge, Rating } from '@mantine/core';
import { toast } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { HiDotsHorizontal} from "react-icons/hi";
// import { useDisclosure } from '@mantine/hooks';
import { Popover,Text} from '@mantine/core';
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";




const GetProfileData = () => {
  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]); // State to store properties
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
console.log(selectedPropertyId);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
         // Decode the token to get the user ID
              const decodedToken = jwtDecode(token);
              const userId = decodedToken?.userId; // Adjust based on your token structure
              if (!userId) {
                toast.error("Invalid token. Please log in again.");
                return;
              }
        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${userId}`,
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
  // console.log(profileData.image);

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
    <h2 className="text-2xl font-bold mb-6">My Properties</h2>

    {/* Section 1: Added Properties */}
    <div className="mb-8 w-auto">
      <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
      {properties.length > 0 ? (
        properties.map((property) => (
          <Card key={property.id} shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
              <img
                  src={
                    property.images.length > 0
                      ? property.images[0]
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />


              </div>
              <div className="flex-1">
                <div className="flex-col justify-end items-center">
               <div className="flex justify-end">
  <div className="cursor-pointer">
   <Popover width={120} position="bottom" withArrow shadow="md">
  <Popover.Target>
    <div style={{ cursor: 'pointer' }}>
      <HiDotsHorizontal size={24} />
    </div>
  </Popover.Target>
  <Popover.Dropdown>
    <div style={{ padding: '8px 0' }}>
    <div className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold">
      <div>
      <MdEdit size={20}/>

      </div>
      <div>
      <Text
        size="md"
        // className="px-4 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold"
      >
        Edit
       
      </Text>
      </div>
      </div>
      <div className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-4">
      <div>
      <AiTwotoneDelete size={20} />
      </div>
        <div>
      <Text
   onClick={() => {
    setSelectedPropertyId(property.propertyId
    );
    openDeleteModal();
  }}       size="md"
      //  className="px-4 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold"
     >
        Delete
      </Text>
      </div>
      
      </div>
    </div>

  </Popover.Dropdown>
</Popover>
<DeletePropertiesModal opened={deleteModalOpened} onClose={closeDeleteModal} propertyId={selectedPropertyId} />


  </div>
</div>
                <Group>
                  <Title order={3}>{property.title}</Title>
                </Group>
                
                </div>
                <Text color="dimmed" className="mt-2">{property.description}</Text>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><Text size="sm" color="dimmed">Price</Text><Text weight={600}>{property.price}</Text></div>
                  <div><Text size="sm" color="dimmed">Location</Text><Text weight={600}>{property.city}, {property.country}</Text></div>
                  <div><Text size="sm" color="dimmed">Size</Text><Text weight={600}>{property.dimension} sqft</Text></div>
                  <div><Text size="sm" color="dimmed">Uploaded On</Text><Text weight={600}>{moment(property.uploaded_at).format("MMM DD, YYYY")}</Text></div>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Text color="dimmed">No properties added yet.</Text>
      )}
    </div>

    {/* Section 2: Booked Properties */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-left">Booked Properties</h3>
      {bookedProperties.length > 0 ? (
        bookedProperties.map((property) => (
          <Card key={property.id} shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
              <img
                  src={property.images?.[0] || '/default-property.jpg'}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <Group>
                  <Title order={3}>{property.title}</Title>
                </Group>
                <Text color="dimmed" className="mt-2">{property.description}</Text>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><Text size="sm" color="dimmed">Price</Text><Text weight={600}>{property.price}</Text></div>
                  <div><Text size="sm" color="dimmed">Location</Text><Text weight={600}>{property.city}, {property.country}</Text></div>
                  <div><Text size="sm" color="dimmed">Booking Date</Text><Text weight={600}>{moment(property.bookedAt).format("MMM DD, YYYY")}</Text></div>
                  <div><Text size="sm" color="dimmed">Status</Text><Badge color="green">Booked</Badge></div>
                </div>
                <Button color="red" size="sm" mt="md" leftSection={<Trash />} onClick={() => removeProperty(property.id)}>
                  Cancel Booking
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Text color="dimmed">No properties booked yet.</Text>
      )}
    </div>
  </div>
</Tabs.Panel>


      </Tabs>
    </div>
  );
};

export default GetProfileData;
