

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { Tabs, Divider } from "@mantine/core";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import { useParams } from "react-router-dom";
import useBookingStore from "../stores/useBookingStore";
import { Card, Group, Title, Text } from "@mantine/core";
import { toast } from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { Popover } from "@mantine/core";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaMoneyBillAlt, FaRuler, FaMapMarkerAlt, FaRoad, FaCompass, FaCalendarAlt } from "react-icons/fa";
import {
 
  FaEye
} from "react-icons/fa";
import ProfileEditModal from "../Pages/ProfileEditModal";
import DeletePropertiesModal from "../Pages/deleteProfilePropertiesModal";
import { PropertiesViews } from "../properties/GetPropertiesDetails";
import { Loader } from "lucide-react";

const UserProfileDetails = () => {
  const { id } = useParams(); // Get the id from the URL

  const { bookedProperties, removeProperty } = useBookingStore();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile data...");
        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php?id=${id}`
        );
        console.log("Response:", response);

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
        } else {
          console.error("Backend error:", response.data.message);
        }
      } catch (err) {
        console.error("Axios error:", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]); // Add id to the dependency array

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-gray-700"><Loader/></p>
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

  return (
    <div className="bg-white p-6 mt-20">
      {/* <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        User Dashboard
      </h1> */}

      <Tabs
        color="teal"
        defaultValue="first"
        className="mx-auto bg-white shadow-md rounded-xl"
      >
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">
            Properties
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" pt="xs">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                      <div className="text-center mb-6">
                        {profileData.image ? (
                          <img
                            src={profileData.image}
                            alt="User Profile"
                            className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
                          />
                        ) : (
                          <div className="w-24 h-24 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                            <img
                              src={`https://ui-avatars.com/api/?name=${profileData.name}&background=random&size=100`}
                              alt="Owner"
                              className="w-16 h-16 rounded-full"
                            />
                          </div>
                        )}
                      </div>
          
                      <div className="space-y-4 text-center">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Name</p>
                          <p className="text-lg font-semibold text-gray-800 capitalize">
                            {profileData.name || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Email</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {profileData.email || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Phone</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {profileData.phoneNumber || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Address</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {profileData.address}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Gender</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {profileData.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">User Type</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {profileData.userType}
                          </p>
                        </div>
                        <div>
                         
                        </div>
                      </div>
          
                   
                    </div>
        </Tabs.Panel>

        <Tabs.Panel value="second" pt="xs">
          <div className="p-6 bg-gray-50 text-center text-gray-700 font-semibold">
            <div className="mb-8 w-auto">
              <h3 className="text-xl font-semibold mb-4 text-left">
                Added Properties
              </h3>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <Card
                    key={property.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="mb-6"
                  >
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
                            {/* <div className="cursor-pointer">
                              <Popover
                                width={120}
                                position="bottom"
                                withArrow
                                shadow="md"
                              >
                                <Popover.Target>
                                  <div style={{ cursor: "pointer" }}>
                                    <HiDotsHorizontal size={24} />
                                  </div>
                                </Popover.Target>
                                <Popover.Dropdown>
                                  <div style={{ padding: "8px 0" }}>
                                    <div
                                      className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
                                      onClick={() => {
                                        setSelectedPropertyId(property.propertyId);
                                        openDeleteModal();
                                      }}
                                    >
                                      <AiTwotoneDelete size={24} />
                                      <Text size="md">Delete</Text>
                                    </div>
                                  </div>
                                </Popover.Dropdown>
                              </Popover>
                            </div> */}
                          </div>
                          <Group>
                            <Title order={3}>{property.title}</Title>
                          </Group>
                        </div>
                        <Text color="dimmed" className="mt-2">
                          {property.description}
                        </Text>
                        <div className="flex justify-center">
                          <div className="grid grid-cols-2 md:grid-cols-7 gap-6 mt-6 w-full">
                          {/* <div className="grid grid-cols-2 md:grid-cols-8 gap-6 mt-6 w-full"> */}

                            {[
                              { label: "Price", value: ` ${property.price}`, icon: <FaMoneyBillAlt className="text-2xl text-blue-500" /> },
                              { label: "Size", value: `${property.dimension} sqft`, icon: <FaRuler className="text-2xl text-green-500" /> },
                              {
                                label: "Location",
                                value: `${property.city}, ${property.country}`,
                                icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
                              },
                              { label: "Road Type", value: property.road_type, icon: <FaRoad className="text-2xl text-purple-500" /> },
                              { label: "Facing", value: property.property_face, icon: <FaCompass className="text-2xl text-yellow-500" /> },
                              {
                                label: "Posted on",
                                value: moment(property.uploaded_at).format("MMM Do YYYY"),
                                icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
                              },
                              // Add the PropertiesViews component here
                              {
                                // label: "Views",
                                value: <PropertiesViews id={property.propertyId} />,
                                // icon: <FaEye className="text-2xl text-purple-500" />,
                              },
                            ].map((detail, index) => (
                              <div
                                key={index}
                                className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
                              >
                                <div className="mb-2">{detail.icon}</div>
                                <p className="text-lg font-semibold text-gray-800">{detail.label}</p>
                                <p className="text-gray-700 text-md mt-1">{detail.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Text color="dimmed">No properties added yet.</Text>
              )}
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>

      <DeletePropertiesModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        propertyId={selectedPropertyId}
      />
    </div>
  );
};

export default UserProfileDetails;