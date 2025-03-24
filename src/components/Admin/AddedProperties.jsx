
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Group, Text, Title, Popover, Loader, Pagination } from '@mantine/core'; 
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaMoneyBillAlt, FaRuler, FaMapMarkerAlt, FaRoad, FaCompass, FaCalendarAlt, FaEye } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddedProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]); // State to store locations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  const fetchProperties = async () => {
    if (!token) {
      toast.error("Please Login First");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/propertiesDetails.php",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);

      if (response.data && response.data.success) {
        setProperties(response.data.properties || []);
        setLocations(response.data.locations || []); // Set locations from the API response
      } else {
        setError("No Properties Found");
      }
    } catch (error) {
      setError("An error occurred while fetching property details");
      setProperties([]);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Function to get location details by location_id
  const getLocationDetails = (locationId) => {
    return locations.find((location) => location.location_id === locationId);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <motion.div className="flex justify-center items-center min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Loader size="xl" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="flex justify-center items-center min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div className="container mx-auto px-4 w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
      {properties.length > 0 ? (
        <>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginatedProperties.map((property, index) => {
              const location = getLocationDetails(property.location_id); // Get location details
              return (
                <motion.div
                  key={property.propertyId}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card padding="lg" radius="md" withBorder>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Text color="dimmed">Property ID: {property.propertyId}</Text>
                        <Popover width={120} position="bottom" withArrow shadow="md">
                          <Popover.Target>
                            <div className="cursor-pointer">
                              <HiDotsHorizontal size={24} />
                            </div>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <div className="p-2">
                              <div
                                className="flex items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
                                onClick={() => navigate(`/navbar/propertiesDetails/${property.propertyId}`)}
                              >
                                <FaEye size={24} className="text-xl text-black-500" />
                                <Text size="sm">View</Text>
                              </div>
                            </div>
                          </Popover.Dropdown>
                        </Popover>
                      </div>
                      <Title order={3}>{property.title}</Title>
                      <Text color="dimmed" className="line-clamp-2">
                        {property.description}
                      </Text>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            label: "Price",
                            value: ` ${property.price}`,
                            icon: <FaMoneyBillAlt className="text-lg text-blue-500" />,
                          },
                          {
                            label: "Size",
                            value: `${property.dimension} sqft`,
                            icon: <FaRuler className="text-lg text-green-500" />,
                          },
                          {
                            label: "Location",
                            value: location ? `${location.city}, ${location.country}` : "N/A",
                            icon: <FaMapMarkerAlt className="text-lg text-red-500" />,
                          },
                          {
                            label: "Road Type",
                            value: property.road_type,
                            icon: <FaRoad className="text-lg text-purple-500" />,
                          },
                          {
                            label: "Facing",
                            value: property.property_face,
                            icon: <FaCompass className="text-lg text-yellow-500" />,
                          },
                          {
                            label: "Posted on",
                            value: moment(property.uploaded_at).format("MMM Do YYYY"),
                            icon: <FaCalendarAlt className="text-lg text-pink-500" />,
                          },
                        ].map((detail, index) => (
                          <motion.div
                            key={index}
                            className="bg-gray-50 p-3 rounded-lg text-center flex flex-col items-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="mb-2">{detail.icon}</div>
                            <p className="text-sm font-semibold text-gray-800">{detail.label}</p>
                            <p className="text-gray-600 text-sm mt-1">{detail.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              total={Math.ceil(properties.length / itemsPerPage)}
              color="blue"
            />
          </div>
        </>
      ) : (
        <Text color="dimmed">No properties added yet.</Text>
      )}
    </motion.div>
  );
};

export default AddedProperties;