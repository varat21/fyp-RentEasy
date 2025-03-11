// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Card, Group, Text, Title, Popover, Divider } from '@mantine/core';
// import { HiDotsHorizontal } from 'react-icons/hi';
// import { MdEdit } from 'react-icons/md';
// import { AiTwotoneDelete } from 'react-icons/ai';
// import { FaMoneyBillAlt, FaRuler, FaMapMarkerAlt, FaRoad, FaCompass, FaCalendarAlt, FaEye } from 'react-icons/fa';
// import moment from 'moment';
// import { Navigate, useNavigate } from 'react-router-dom';

// const AddedProperties = () => {
//     const Navigate =useNavigate();
//     const [properties, setProperties] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem('token');

//     const fetchProperties = async () => {
//         if (!token) {
//             toast.error("Please Login First");
//             return;
//         }

//         try {
//             const response = await axios.get(
//                 "http://localhost/rent-easy/public/Admin/propertiesDetails.php",
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             console.log(response.data)

//             if (response.data && response.data.success && response.data.properties) {
//                 setProperties(response.data.properties);
//             } else {
//                 setError("No Properties Found");
//             }
//         } catch (error) {
//             setError("An error occurred while fetching property details");
//             setProperties([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProperties();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="mb-8 w-auto">
//             <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
//             {properties.length > 0 ? (
//                 properties.map((property) => (
//                     <Card key={property.id} shadow="sm" padding="lg" radius="md" withBorder className="mb-4">
//                         <div className="flex flex-col md:flex-row gap-6">
//                             {/* <div className="w-full md:w-1/4">
//                                 <img
//                                     src={property.images && property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/400x300?text=No+Image"}
//                                     alt={property.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div> */}
//                             <div className="flex-1">
//                                 <div className="flex-col justify-end items-center">
//                                     <div className="flex justify-end">
//                                         <div className="cursor-pointer">
//                                             <Popover width={120} position="bottom" withArrow shadow="md">
//                                                 <Popover.Target>
//                                                     <div style={{ cursor: "pointer" }}>
//                                                         <HiDotsHorizontal size={24} />
//                                                     </div>
//                                                 </Popover.Target>
//                                                 <Popover.Dropdown>
//                                                     <div style={{ padding: "8px 0" }}>
//                                                     <div
//     className="flex items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
//     onClick={() => {
//         console.log("Property ID:", property.propertyId); // Debugging line
//         Navigate(`/GetPropertyDetails/${property.propertyId}`);
//     }}
// >
//     <FaEye className="text-xl text-black-500" />
//     <Text size="md">View</Text>
// </div>

//                                                         {/* <Divider my="sm" /> */}

//                                                         {/* <div
//                                                             className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
//                                                             onClick={() => {
//                                                                 setSelectedPropertyId(property.propertyId);
//                                                                 openDeleteModal();
//                                                             }}
//                                                         >
//                                                             <AiTwotoneDelete size={24} />
//                                                             <Text size="md">Delete</Text>
//                                                         </div> */}
//                                                     </div>
//                                                 </Popover.Dropdown>
//                                             </Popover>
//                                         </div>
//                                     </div>
//                                     <Group>
//                                         <Title order={3}>{property.title}</Title>
//                                     </Group>
//                                 </div>
//                                 <Text color="dimmed" className="mt-2">
//                                     {property.description}
//                                 </Text>
//                                 <div className="flex justify-center">
//                                     <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6 w-full">
//                                         {[
//                                             {
//                                                 label: "Price",
//                                                 value: ` ${property.price}`,
//                                                 icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
//                                             },
//                                             {
//                                                 label: "Size",
//                                                 value: `${property.dimension} sqft`,
//                                                 icon: <FaRuler className="text-2xl text-green-500" />,
//                                             },
//                                             {
//                                                 label: "Location",
//                                                 value: `${property.city}, ${property.country}`,
//                                                 icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
//                                             },
//                                             {
//                                                 label: "Road Type",
//                                                 value: property.road_type,
//                                                 icon: <FaRoad className="text-2xl text-purple-500" />,
//                                             },
//                                             {
//                                                 label: "Facing",
//                                                 value: property.property_face,
//                                                 icon: <FaCompass className="text-2xl text-yellow-500" />,
//                                             },
//                                             {
//                                                 label: "Posted on",
//                                                 value: moment(property.uploaded_at).format("MMM Do YYYY"),
//                                                 icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
//                                             },
//                                         ].map((detail, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
//                                             >
//                                                 <div className="mb-2">{detail.icon}</div>
//                                                 <p className="text-lg font-semibold text-gray-800">{detail.label}</p>
//                                                 <p className="text-gray-700 text-md mt-1">{detail.value}</p>
//                                             </div>
//                                         ))}
                                        
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Card>
//                 ))
//             ) : (
//                 <Text color="dimmed">No properties added yet.</Text>
//             )}
//         </div>
//     );
// };

// export default AddedProperties;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Group, Text, Title, Popover } from '@mantine/core';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaMoneyBillAlt, FaRuler, FaMapMarkerAlt, FaRoad, FaCompass, FaCalendarAlt, FaEye } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const AddedProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]); // State to store locations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mb-8 w-auto">
      <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
      {properties.length > 0 ? (
        properties.map((property) => {
          const location = getLocationDetails(property.location_id); // Get location details
          return (
            <Card key={property.propertyId} shadow="sm" padding="lg" radius="md" withBorder className="mb-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex-col justify-end items-center">
                    <div className="flex justify-end">
                      <div className="cursor-pointer">
                        <Popover width={120} position="bottom" withArrow shadow="md">
                          <Popover.Target>
                            <div style={{ cursor: "pointer" }}>
                              <HiDotsHorizontal size={24} />
                            </div>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <div style={{ padding: "8px 0" }}>
                              <div
                                className="flex items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
                                onClick={() => navigate(`/navbar/propertiesDetails/${property.propertyId}`)}
                              >
                                <FaEye className="text-xl text-black-500" />
                                <Text size="md">View</Text>
                              </div>
                            </div>
                          </Popover.Dropdown>
                        </Popover>
                      </div>
                    </div>
                    <Text color="dimmed" className="mt-2">Property ID: {property.propertyId}</Text>

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
                          icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
                        },
                        {
                          label: "Size",
                          value: `${property.dimension} sqft`,
                          icon: <FaRuler className="text-2xl text-green-500" />,
                        },
                        {
                          label: "Location",
                          value: location ? `${location.city}, ${location.country}` : "N/A", // Display location details
                          icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
                        },
                        {
                          label: "Road Type",
                          value: property.road_type,
                          icon: <FaRoad className="text-2xl text-purple-500" />,
                        },
                        {
                          label: "Facing",
                          value: property.property_face,
                          icon: <FaCompass className="text-2xl text-yellow-500" />,
                        },
                        {
                          label: "Posted on",
                          value: moment(property.uploaded_at).format("MMM Do YYYY"),
                          icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
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
          );
        })
      ) : (
        <Text color="dimmed">No properties added yet.</Text>
      )}
    </div>
  );
};

export default AddedProperties;