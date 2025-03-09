import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import { Tabs, Divider } from "@mantine/core";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import useBookingStore from "../stores/useBookingStore";

import { Card, Group, Title, Badge, Rating } from "@mantine/core";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { HiDotsHorizontal } from "react-icons/hi";
import { Popover, Text } from "@mantine/core";
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import EditPropertiesModal from "./EditPropertiesModal";
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
} from "react-icons/fa";

const GetProfileData = () => {
  // const { bookedProperties, totalAmount, removeProperty, clearBookings } =
  //   useBookingStore();
  const [userId, setUserId] = useState(null);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken?.userId;
        console.log(extractedUserId);

        if (!extractedUserId) {
          toast.error("Invalid token. Please log in again.");
          return;
        }

        setUserId(extractedUserId); // Set userId state

        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
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

  return (
    <div className="bg-white p-6 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        My Dashboard
      </h1>

      <Tabs
        color="teal"
        defaultValue="first"
        className="mx-auto bg-white shadow-md rounded-xl"
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
                <div className="text-sm font-medium text-gray-700 dark:text-white">
                  Name:
                </div>
                <div className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {profileData.name || "N/A"}
                </div>
              </div>
              <div className="flex mt-4 items-center justify-center">
                <div className="text-sm font-medium text-gray-700 dark:text-white">
                  Address:
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {profileData.address || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between p-10">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone:
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.phoneNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender:
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.gender || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email:
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {profileData.email || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Type:
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
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
                            <div className="cursor-pointer">
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
                                      className="flex items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
                                      onClick={() => {
                                        setSelectedPropertyId(
                                          property.propertyId
                                        );
                                        openEditModal();
                                      }}
                                    >
                                      <MdEdit size={20} />
                                      <Text size="md">Edit</Text>
                                    </div>

                                    <Divider my="sm" />

                                    <div
                                      className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
                                      onClick={() => {
                                        setSelectedPropertyId(
                                          property.propertyId
                                        );
                                        openDeleteModal();
                                      }}
                                    >
                                      <AiTwotoneDelete size={24} />
                                      <Text size="md">Delete</Text>
                                    </div>
                                  </div>
                                </Popover.Dropdown>
                              </Popover>
                            </div>
                          </div>
                          <Group>
                            <Title order={3}>{property.title}</Title>
                          </Group>
                        </div>
                        <Text color="dimmed" className="mt-2">
                          {property.description}
                        </Text>
                        <div className="flex justify-center">
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6 w-full">
                            {[
                              {
                                label: "Price",
                                value: ` ${property.price}`,
                                icon: (
                                  <FaMoneyBillAlt className="text-2xl text-blue-500" />
                                ),
                              },
                              {
                                label: "Size",
                                value: `${property.dimension} sqft`,
                                icon: (
                                  <FaRuler className="text-2xl text-green-500" />
                                ),
                              },
                              {
                                label: "Location",
                                value: `${property.city}, ${property.country}`,
                                icon: (
                                  <FaMapMarkerAlt className="text-2xl text-red-500" />
                                ),
                              },
                              {
                                label: "Road Type",
                                value: property.road_type,
                                icon: (
                                  <FaRoad className="text-2xl text-purple-500" />
                                ),
                              },
                              {
                                label: "Facing",
                                value: property.property_face,
                                icon: (
                                  <FaCompass className="text-2xl text-yellow-500" />
                                ),
                              },
                              {
                                label: "Posted on",
                                value: moment(property.uploaded_at).format(
                                  "MMM Do YYYY"
                                ),
                                icon: (
                                  <FaCalendarAlt className="text-2xl text-pink-500" />
                                ),
                              },
                            ].map((detail, index) => (
                              <div
                                key={index}
                                className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
                              >
                                <div className="mb-2">{detail.icon}</div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {detail.label}
                                </p>
                                <p className="text-gray-700 text-md mt-1">
                                  {detail.value}
                                </p>
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

      {userId && (
        <EditPropertiesModal
          userId={userId}
          opened={editModalOpened}
          onClose={closeEditModal}
          propertyId={selectedPropertyId}
          property={properties.find((p) => p.propertyId === selectedPropertyId)}
          image={
            properties.find((p) => p.propertyId === selectedPropertyId)
              ?.images?.[0] ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
        />
      )}

      <DeletePropertiesModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        propertyId={selectedPropertyId}
      />
    </div>
  );
};

export default GetProfileData;
