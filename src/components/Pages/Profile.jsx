// import React, { useEffect, useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import ProfileEditModal from "./ProfileEditModal";
// import axios from "axios";
// import { Tabs, Divider, Modal } from "@mantine/core";
// import { Button } from "@mantine/core";
// import { CiUser } from "react-icons/ci";
// import moment from "moment";
// import useBookingStore from "../stores/useBookingStore";
// import { Card, Group, Title, Badge, Rating, Text } from "@mantine/core";
// import { toast } from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { MdEdit } from "react-icons/md";
// import EditPropertiesModal from "./EditPropertiesModal";
// import {
//   FaMoneyBillAlt,
//   FaRuler,
//   FaMapMarkerAlt,
//   FaRoad,
//   FaCompass,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Trash } from "lucide-react";
// import DeletePropertiesModal from "./deleteProfilePropertiesModal";

// const GetProfileData = () => {
//   // State and hooks
//   const [userId, setUserId] = useState(null);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [properties, setProperties] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
//   const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const [khaltiCheckout, setKhaltiCheckout] = useState(null);

//   // Zustand store
//   const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
//   const navigate = useNavigate();

//   // Load Khalti script on component mount
//   useEffect(() => {
//     const loadKhaltiScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js';
//       script.onload = () => {
//         const config = {
//           publicKey: 'test_public_key_YOUR_KEY_HERE', // Replace with your test public key
//           productIdentity: 'rent_easy_booking',
//           productName: 'Property Booking',
//           productUrl: window.location.href,
//           eventHandler: {
//             onSuccess(payload) {
//               verifyKhaltiPayment(payload);
//             },
//             onError(error) {
//               toast.error(`Payment failed: ${error.message}`);
//               setPaymentProcessing(false);
//             },
//             onClose() {
//               setPaymentProcessing(false);
//             }
//           }
//         };
//         setKhaltiCheckout(new window.KhaltiCheckout(config));
//       };
//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//       };
//     };

//     loadKhaltiScript();
//   }, []);

//   // Payment verification
//   useEffect(() => {
//     const verifyPaymentOnRedirect = async () => {
//       const query = new URLSearchParams(window.location.search);
//       const pidx = query.get('pidx');
      
//       if (pidx) {
//         await verifyKhaltiPayment({ pidx });
//         navigate(window.location.pathname, { replace: true });
//       }
//     };

//     verifyPaymentOnRedirect();
//   }, [navigate]);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found");
//         setLoading(false);
//         return;
//       }

//       try {
//         const decodedToken = jwtDecode(token);
//         const extractedUserId = decodedToken?.userId;
//         setUserId(extractedUserId);

//         const response = await axios.get(
//           `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data.success) {
//           setProfileData(response.data.user);
//           setProperties(response.data.properties || []);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const verifyKhaltiPayment = async (payload) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login to verify payment");
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost/rent-easy/public/khaltiPayment/verify-payment.php',
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success && response.data.status === 'Completed') {
//         toast.success("Payment verified successfully!");
//         clearBookings();
//         navigate("/payment-success", { 
//           state: { 
//             paymentDetails: response.data,
//             bookedProperties: bookedProperties 
//           } 
//         });
//       } else {
//         toast.error(response.data.message || "Payment verification failed");
//       }
//     } catch (error) {
//       console.error("Payment verification error:", error);
//       toast.error(error.response?.data?.message || "Payment verification failed");
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   const handleRemoveProperty = (bookingId) => {
//     removeProperty(bookingId);
//     toast.success("Property removed from bookings");
//   };

//   const handleKhaltiPayment = () => {
//     if (!khaltiCheckout) {
//       toast.error("Payment gateway not loaded yet");
//       return;
//     }

//     if (bookedProperties.length === 0) {
//       toast.error("No properties booked");
//       return;
//     }

//     setPaymentProcessing(true);
    
//     // Khalti expects amount in paisa (1 NPR = 100 paisa)
//     const amountInPaisa = totalAmount * 100;
    
//     // Show Khalti payment popup
//     khaltiCheckout.show({ amount: amountInPaisa });
//   };

//   const calculateAverageRating = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-lg font-semibold text-red-500">No profile data found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 mt-20">
//       <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">My Dashboard</h1>

//       <Tabs color="teal" defaultValue="first" className="mx-auto bg-white shadow-md rounded-xl">
//         <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
//           <Tabs.Tab value="first" className="text-lg font-semibold">
//             Booked Properties
//           </Tabs.Tab>
//           <Tabs.Tab value="second" className="text-lg font-semibold">
//             My Profile
//           </Tabs.Tab>
//           <Tabs.Tab value="third" className="text-lg font-semibold">
//             My Properties
//           </Tabs.Tab>
//         </Tabs.List>

//         {/* Booked Properties Tab */}
//         <Tabs.Panel value="first" pt="xs">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="container mx-auto p-4"
//           >
//             <h3 className="text-xl font-semibold mb-4 text-left">My Booked Properties</h3>

//             {bookedProperties.length > 0 ? (
//               bookedProperties.map((property) => (
//                 <Card
//                   key={property.bookingId}
//                   shadow="sm"
//                   padding="lg"
//                   radius="md"
//                   withBorder
//                   className="mb-6"
//                 >
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="w-full md:w-1/4">
//                       <img
//                         src={property.images?.[0] || "/default-property.jpg"}
//                         alt={property.title}
//                         className="w-full h-48 object-cover rounded-lg"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <Group>
//                           <Title order={3}>{property.title}</Title>
//                           <Badge variant="filled" size="lg">
//                             Booking #{bookedProperties.findIndex(p => p.bookingId === property.bookingId) + 1}
//                           </Badge>
//                         </Group>
//                         <Button
//                           onClick={() => handleRemoveProperty(property.bookingId)}
//                           variant="subtle"
//                           color="red"
//                         >
//                           <Trash size={20} />
//                         </Button>
//                       </div>

//                       <Text color="dimmed" className="mt-2">
//                         {property.description}
//                       </Text>

//                       {property.ratings?.length > 0 && (
//                         <div className="mt-4 flex items-center gap-2">
//                           <Rating
//                             value={calculateAverageRating(property.ratings)}
//                             readOnly
//                             size="sm"
//                           />
//                           <Text size="sm" color="dimmed">
//                             {calculateAverageRating(property.ratings)} (
//                             {property.ratings.length} reviews)
//                           </Text>
//                         </div>
//                       )}

//                       <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div>
//                           <Text size="sm" color="dimmed">
//                             Price
//                           </Text>
//                           <Text weight={600}>Rs. {property.price}</Text>
//                         </div>
//                         <div>
//                           <Text size="sm" color="dimmed">
//                             Location
//                           </Text>
//                           <Text weight={600}>
//                             {property.city}, {property.country}
//                           </Text>
//                         </div>
//                         <div>
//                           <Text size="sm" color="dimmed">
//                             Size
//                           </Text>
//                           <Text weight={600}>{property.dimension} sqft</Text>
//                         </div>
//                         <div>
//                           <Text size="sm" color="dimmed">
//                             Booked On
//                           </Text>
//                           <Text weight={600}>
//                             {moment(property.bookingDate).format("MMM DD, YYYY")}
//                           </Text>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))
//             ) : (
//               <Text color="dimmed">No properties booked yet.</Text>
//             )}

//             <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
//               <Group position="apart" className="mb-6">
//                 <Title order={3}>Booking Summary</Title>
//                 <Text size="sm" color="dimmed">
//                   Total Bookings: {bookedProperties.length}
//                 </Text>
//               </Group>

//               <Group position="right" spacing="md">
//                 <Button onClick={() => navigate("/")} variant="outline">
//                   Continue Browsing
//                 </Button>
//                 <Button
//                   onClick={() => setPaymentModalOpen(true)}
//                   variant="filled"
//                   disabled={bookedProperties.length === 0}
//                 >
//                   Complete Payment
//                 </Button>
//               </Group>
//             </Card>
//           </motion.div>
//         </Tabs.Panel>

//         {/* My Profile Tab */}
//         <Tabs.Panel value="second" pt="xs">
//           <div className="bg-white dark:bg-gray-300 rounded-xl shadow-lg p-6">
//             <div className="text-center mb-6">
//               {profileData.image ? (
//                 <img
//                   src={profileData.image}
//                   alt="User Profile"
//                   className="w-32 h-32 mx-auto rounded-full border-4 border-black"
//                 />
//               ) : (
//                 <CiUser className="w-32 h-32 mx-auto rounded-full border-4 border-black" />
//               )}

//               <div className="flex mt-4 items-center justify-center">
//                 <div className="text-sm font-medium text-gray-700">Name:</div>
//                 <div className="text-lg font-semibold text-gray-800 capitalize ml-2">
//                   {profileData.name || "N/A"}
//                 </div>
//               </div>
//               <div className="flex mt-4 items-center justify-center">
//                 <div className="text-sm font-medium text-gray-700">Address:</div>
//                 <div className="text-lg font-semibold text-gray-800 capitalize ml-2">
//                   {profileData.address || "N/A"}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-between p-10">
//               <div>
//                 <span className="text-sm font-medium text-gray-700">Phone:</span>
//                 <span className="text-lg font-semibold text-gray-800 ml-2">
//                   {profileData.phoneNumber || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700">Gender:</span>
//                 <span className="text-lg font-semibold text-gray-800 ml-2">
//                   {profileData.gender || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700">Email:</span>
//                 <span className="text-lg font-semibold text-gray-800 ml-2">
//                   {profileData.email || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700">User Type:</span>
//                 <span className="text-lg font-semibold text-gray-800 ml-2">
//                   {profileData.userType || "N/A"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4">
//               <Button variant="outline" onClick={open}>
//                 Edit Profile
//               </Button>
//             </div>
//           </div>
//         </Tabs.Panel>

//         {/* My Properties Tab */}
//         <Tabs.Panel value="third" pt="xs">
//           <div className="p-6 bg-gray-50">
//             <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
//             {properties.length > 0 ? (
//               properties.map((property) => (
//                 <Card
//                   key={property.id}
//                   shadow="sm"
//                   padding="lg"
//                   radius="md"
//                   withBorder
//                   className="mb-6"
//                 >
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="w-full md:w-1/4">
//                       <img
//                         src={
//                           property.images.length > 0
//                             ? property.images[0]
//                             : "https://via.placeholder.com/400x300?text=No+Image"
//                         }
//                         alt={property.title}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <Title order={3}>{property.title}</Title>
//                         <div className="flex gap-2">
//                           <Button
//                             variant="outline"
//                             leftIcon={<MdEdit size={16} />}
//                             onClick={() => {
//                               setSelectedPropertyId(property.propertyId);
//                               openEditModal();
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outline"
//                             color="red"
//                             leftIcon={<AiTwotoneDelete size={16} />}
//                             onClick={() => {
//                               setSelectedPropertyId(property.propertyId);
//                               openDeleteModal();
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </div>
//                       <Text color="dimmed" className="mt-2">
//                         {property.description}
//                       </Text>
//                       <div className="flex justify-center">
//                         <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6 w-full">
//                           {[
//                             {
//                               label: "Price",
//                               value: `Rs. ${property.price}`,
//                               icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
//                             },
//                             {
//                               label: "Size",
//                               value: `${property.dimension} sqft`,
//                               icon: <FaRuler className="text-2xl text-green-500" />,
//                             },
//                             {
//                               label: "Location",
//                               value: `${property.city}, ${property.country}`,
//                               icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
//                             },
//                             {
//                               label: "Road Type",
//                               value: property.road_type,
//                               icon: <FaRoad className="text-2xl text-purple-500" />,
//                             },
//                             {
//                               label: "Facing",
//                               value: property.property_face,
//                               icon: <FaCompass className="text-2xl text-yellow-500" />,
//                             },
//                             {
//                               label: "Posted on",
//                               value: moment(property.uploaded_at).format("MMM Do YYYY"),
//                               icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
//                             },
//                           ].map((detail, index) => (
//                             <div
//                               key={index}
//                               className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
//                             >
//                               <div className="mb-2">{detail.icon}</div>
//                               <p className="text-lg font-semibold text-gray-800">
//                                 {detail.label}
//                               </p>
//                               <p className="text-gray-700 text-md mt-1">
//                                 {detail.value}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))
//             ) : (
//               <Text color="dimmed">No properties added yet.</Text>
//             )}
//           </div>
//         </Tabs.Panel>
//       </Tabs>

//       {/* Modals */}
//       <ProfileEditModal
//         opened={opened}
//         close={close}
//         name={profileData.name}
//         address={profileData.address}
//         phoneNumber={profileData.phoneNumber}
//         gender={profileData.gender}
//         password={profileData.password}
//         id={profileData.id}
//         email={profileData.email}
//       />

//       <EditPropertiesModal
//         userId={userId}
//         opened={editModalOpened}
//         onClose={closeEditModal}
//         propertyId={selectedPropertyId}
//         property={properties.find((p) => p.propertyId === selectedPropertyId)}
//       />

//       <DeletePropertiesModal
//         opened={deleteModalOpened}
//         onClose={closeDeleteModal}
//         propertyId={selectedPropertyId}
//       />

//       <Modal
//         opened={paymentModalOpen}
//         onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
//         title="Complete Payment"
//         centered
//       >
//         <div className="p-4">
//           <Text color="dimmed" className="mb-4">
//             You are about to pay Rs. {Number(totalAmount || 0).toFixed(2)} for {bookedProperties.length} properties.
//           </Text>
          
//           <div className="mb-6">
//             {bookedProperties.map((property, index) => (
//               <div key={index} className="flex justify-between py-2 border-b">
//                 <Text>{property.title}</Text>
//                 <Text weight={600}>Rs. {property.price}</Text>
//               </div>
//             ))}
//             <div className="flex justify-between py-2 font-bold mt-2">
//               <Text>Total Amount:</Text>
//               <Text>Rs. {Number(totalAmount || 0).toFixed(2)}</Text>
//             </div>
//           </div>

//           <Button
//             onClick={handleKhaltiPayment}
//             loading={paymentProcessing}
//             fullWidth
//             disabled={bookedProperties.length === 0}
//           >
//             {paymentProcessing ? "Processing..." : "Pay with Khalti"}
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default GetProfileData;


// import React, { useEffect, useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import ProfileEditModal from "./ProfileEditModal";
// import axios from "axios";
// import { Tabs, Card, Group, Title, Text, Button } from "@mantine/core";
// import { CiUser } from "react-icons/ci";
// import moment from "moment";
// import useBookingStore from "../stores/useBookingStore";
// import { toast } from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { MdEdit } from "react-icons/md";
// import EditPropertiesModal from "./EditPropertiesModal";
// import { useNavigate } from "react-router-dom";
// import { Trash } from "lucide-react";
// import DeletePropertiesModal from "./deleteProfilePropertiesModal";

// const GetProfileData = () => {
//   const [userId, setUserId] = useState(null);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [properties, setProperties] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
//   const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
//   const [khaltiCheckout, setKhaltiCheckout] = useState(null);

//   const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
//   const navigate = useNavigate();

//   // Load Khalti script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js";
//     script.onload = () => {
//       const config = {
//         publicKey: "1edff6b3231843e1915302852d5ed217", // Replace with your actual key
//         productIdentity: "rent_easy_booking",
//         productName: "Property Booking",
//         productUrl: window.location.href,
//         eventHandler: {
//           onSuccess(payload) {
//             verifyKhaltiPayment(payload);
//           },
//           onError() {
//             toast.error("Payment failed!");
//           },
//           onClose() {},
//         },
//       };
//       setKhaltiCheckout(new window.KhaltiCheckout(config));
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const decodedToken = jwtDecode(token);
//         setUserId(decodedToken?.userId);

//         const response = await axios.get(
//           `http://localhost/rent-easy/public/profile.php/id=${decodedToken?.userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data.success) {
//           setProfileData(response.data.user);
//           setProperties(response.data.properties || []);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const verifyKhaltiPayment = async (payload) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost/rent-easy/public/khaltiPayment/verify-payment.php",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success && response.data.status === "Completed") {
//         toast.success("Payment successful!");
//         clearBookings();
//         navigate("/payment-success");
//       } else {
//         toast.error("Payment verification failed");
//       }
//     } catch (error) {
//       toast.error("Payment verification error");
//     }
//   };

//   const handleKhaltiPayment = () => {
//     if (!khaltiCheckout) {
//       toast.error("Payment system not ready");
//       return;
//     }
//     if (bookedProperties.length === 0) {
//       toast.error("No properties booked");
//       return;
//     }

//     const amountInPaisa = totalAmount * 100;
//     khaltiCheckout.show({ amount: amountInPaisa });
//   };

//   const handleRemoveProperty = (bookingId) => {
//     removeProperty(bookingId);
//     toast.success("Property removed");
//   };

//   if (loading) return <div className="text-center text-xl mt-20">Loading...</div>;
//   if (!profileData) return <div className="text-center text-xl mt-20 text-red-500">No profile data found</div>;

//   return (
//     <div className="min-h-screen bg-white p-6">
//       {/* Header */}
//       <div className="max-w-4xl mx-auto bg-white rounded-lg   p-6 mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 text-center">My Dashboard</h1>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-4xl mx-auto">
//         <Tabs defaultValue="first">
//           <Tabs.List className="mb-6 flex justify-center gap-4">
//             <Tabs.Tab value="first" className="text-lg font-medium">Booked Properties</Tabs.Tab>
//             <Tabs.Tab value="second" className="text-lg font-medium">My Profile</Tabs.Tab>
//             <Tabs.Tab value="third" className="text-lg font-medium">My Properties</Tabs.Tab>
//           </Tabs.List>

//           {/* Booked Properties Tab */}
//           <Tabs.Panel value="first">
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold text-gray-700">Booked Properties</h2>
//               {bookedProperties.length > 0 ? (
//                 bookedProperties.map((property) => (
//                   <Card key={property.bookingId} withBorder shadow="sm" padding="lg" radius="md">
//                     <div className="flex flex-col md:flex-row gap-4">
//                       <img
//                         src={property.images?.[0] || "/default-property.jpg"}
//                         alt={property.title}
//                         className="w-full md:w-1/3 h-40 object-cover rounded-md"
//                       />
//                       <div className="flex-1">
//                         <Group position="apart">
//                           <Title order={3} className="text-gray-800">{property.title}</Title>
//                           <Button
//                             variant="subtle"
//                             color="red"
//                             onClick={() => handleRemoveProperty(property.bookingId)}
//                           >
//                             <Trash size={18} />
//                           </Button>
//                         </Group>
//                         <Text className="text-gray-600">Price: {property.price} NPR</Text>
//                         <Text className="text-gray-600">Location: {property.city}, {property.country}</Text>
//                         <Text className="text-gray-500 text-sm">
//                           Booked on: {moment(property.bookingDate).format("MMM DD, YYYY")}
//                         </Text>
//                       </div>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <Text className="text-gray-500 text-center">No properties booked yet.</Text>
//               )}
//               <Card withBorder shadow="sm" padding="lg" radius="md">
//                 <Group position="apart">
//                   <Text className="text-lg font-semibold">Total: {totalAmount} NPR</Text>
//                   <Group>
//                     <Button variant="outline" color="gray" onClick={() => navigate("/")}>
//                       Browse More
//                     </Button>
//                     <Button
//                       color="blue"
//                       onClick={handleKhaltiPayment}
//                       disabled={bookedProperties.length === 0}
//                     >
//                       Pay Now
//                     </Button>
//                   </Group>
//                 </Group>
//               </Card>
//             </div>
//           </Tabs.Panel>

//           {/* My Profile Tab */}
//           <Tabs.Panel value="second">
//             <Card withBorder shadow="sm" padding="lg" radius="md">
//               <div className="text-center">
//                 {profileData.image ? (
//                   <img
//                     src={profileData.image}
//                     alt="Profile"
//                     className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
//                   />
//                 ) : (
//                   <CiUser className="w-24 h-24 mx-auto text-gray-400" />
//                 )}
//                 <Title order={2} className="mt-4 text-gray-800">{profileData.name}</Title>
//                 <Text className="text-gray-600 mt-2">Email: {profileData.email}</Text>
//                 <Text className="text-gray-600">Phone: {profileData.phoneNumber || "Not set"}</Text>
//                 <Button className="mt-4" variant="outline" color="blue" onClick={open}>
//                   Edit Profile
//                 </Button>
//               </div>
//             </Card>
//           </Tabs.Panel>

//           {/* My Properties Tab */}
//           <Tabs.Panel value="third">
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold text-gray-700">My Added Properties</h2>
//               {properties.length > 0 ? (
//                 properties.map((property) => (
//                   <Card key={property.id} withBorder shadow="sm" padding="lg" radius="md">
//                     <div className="flex flex-col md:flex-row gap-4">
//                       <img
//                         src={property.images[0] || "https://via.placeholder.com/400x300"}
//                         alt={property.title}
//                         className="w-full md:w-1/3 h-40 object-cover rounded-md"
//                       />
//                       <div className="flex-1">
//                         <Group position="apart">
//                           <Title order={3} className="text-gray-800">{property.title}</Title>
//                           <Group>
//                             <Button
//                               variant="subtle"
//                               color="blue"
//                               onClick={() => {
//                                 setSelectedPropertyId(property.propertyId);
//                                 openEditModal();
//                               }}
//                             >
//                               <MdEdit size={18} />
//                             </Button>
//                             <Button
//                               variant="subtle"
//                               color="red"
//                               onClick={() => {
//                                 setSelectedPropertyId(property.propertyId);
//                                 openDeleteModal();
//                               }}
//                             >
//                               <AiTwotoneDelete size={18} />
//                             </Button>
//                           </Group>
//                         </Group>
//                         <Text className="text-gray-600">Price: {property.price} NPR</Text>
//                         <Text className="text-gray-600">Location: {property.city}, {property.country}</Text>
//                       </div>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <Text className="text-gray-500 text-center">No properties added yet.</Text>
//               )}
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>

//       {/* Modals */}
//       <ProfileEditModal opened={opened} close={close} {...profileData} />
//       <EditPropertiesModal
//         userId={userId}
//         opened={editModalOpened}
//         onClose={closeEditModal}
//         propertyId={selectedPropertyId}
//         property={properties.find((p) => p.propertyId === selectedPropertyId)}
//       />
//       <DeletePropertiesModal
//         opened={deleteModalOpened}
//         onClose={closeDeleteModal}
//         propertyId={selectedPropertyId}
//       />
//     </div>
//   );
// };

// export default GetProfileData;





import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import { Tabs, Card, Group, Title, Text, Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import useBookingStore from "../stores/useBookingStore";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import EditPropertiesModal from "./EditPropertiesModal";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import PaymentButton from "./PaymentButton";

const GetProfileData = () => {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [khaltiCheckout, setKhaltiCheckout] = useState(null);

  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
  const navigate = useNavigate();

  // Load Khalti script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js";
    script.onload = () => {
      const config = {
        publicKey: "987654", 
        productIdentity: "rent_easy_booking",
        productName: "Property Booking",
        productUrl: window.location.href,
        eventHandler: {
          onSuccess(payload) {
            verifyKhaltiPayment(payload);
          },
          onError() {
            toast.error("Payment failed!");
          },
          onClose() {},
        },
      };
      setKhaltiCheckout(new window.KhaltiCheckout(config));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  const handleAddPropertyClick = () => {
    navigate("/addProperties"); // Navigate to the add property page
  };


  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken?.userId);

        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${decodedToken?.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // const verifyKhaltiPayment = async (payload) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "http://localhost/rent-easy/public/khaltiPayment/verify-payment.php",
  //       payload,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response.data.success && response.data.status === "Completed") {
  //       toast.success("Payment successful!");
  //       clearBookings();
  //       navigate("/payment-success");
  //     } else {
  //       toast.error("Payment verification failed");
  //     }
  //   } catch (error) {
  //     toast.error("Payment verification error");
  //   }
  // };

  // const handleKhaltiPayment = () => {
  //   if (!khaltiCheckout) {
  //     toast.error("Payment system not ready");
  //     return;
  //   }
  //   if (bookedProperties.length === 0) {
  //     toast.error("No properties booked");
  //     return;
  //   }

  //   const amountInPaisa = totalAmount * 100;
  //   khaltiCheckout.show({ amount: amountInPaisa });
  // };

  const handleRemoveProperty = (bookingId) => {
    removeProperty(bookingId);
    toast.success("Property removed");
  };

  if (loading) return <div className="text-center text-xl mt-20">Loading...</div>;
  if (!profileData) return <div className="text-center text-xl mt-20 text-red-500">No profile data found</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg   p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">My Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="first">
          <Tabs.List className="mb-6 flex justify-center gap-4">
            <Tabs.Tab value="first" className="text-lg font-medium">Booked Properties</Tabs.Tab>
            <Tabs.Tab value="second" className="text-lg font-medium">My Profile</Tabs.Tab>
            <Tabs.Tab value="third" className="text-lg font-medium">My Properties</Tabs.Tab>
            <Tabs.Tab 
          value="fourth" 
          className="text-lg font-medium"
          onClick={handleAddPropertyClick} // Add onClick handler
        >
          Add Property
        </Tabs.Tab>
      {/* </Tabs.List> */}

          </Tabs.List>

          {/* Booked Properties Tab */}
          <Tabs.Panel value="first">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">Booked Properties</h2>
              {bookedProperties.length > 0 ? (
                bookedProperties.map((property) => (
                  <Card key={property.bookingId} withBorder shadow="sm" padding="lg" radius="md">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={property.images?.[0] || "/default-property.jpg"}
                        alt={property.title}
                        className="w-full md:w-1/3 h-40 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <Group position="apart">
                          <Title order={3} className="text-gray-800">{property.title}</Title>
                          <Button
                            variant="subtle"
                            color="red"
                            onClick={() => handleRemoveProperty(property.bookingId)}
                          >
                            <Trash size={18} />
                          </Button>
                        </Group>
                        <Text className="text-gray-600">Price: {property.price} NPR</Text>
                        <Text className="text-gray-600">Location: {property.city}, {property.country}</Text>
                        <Text className="text-gray-500 text-sm">
                          Booked on: {moment(property.bookingDate).format("MMM DD, YYYY")}
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Text className="text-gray-500 text-center">No properties booked yet.</Text>
              )}
              <Card withBorder shadow="sm" padding="lg" radius="md">
                <Group position="apart">
                  <Text className="text-lg font-semibold">Total: {totalAmount} NPR</Text>
                  <Group>
                    <Button variant="outline" color="gray" onClick={() => navigate("/")}>
                      Browse More
                    </Button>
                    <Button
  color="blue"
  onClick={() => navigate('/payment')} // Navigate to the payment page
  disabled={bookedProperties.length === 0}
>
  Pay Now
</Button>
                  </Group>
                </Group>
              </Card>
            </div>
          </Tabs.Panel>

          {/* My Profile Tab */}
          <Tabs.Panel value="second">
            <Card withBorder shadow="sm" padding="lg" radius="md">
              <div className="text-center">
                {profileData.image ? (
                  <img
                    src={profileData.image}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
                  />
                ) : (
                  <CiUser className="w-24 h-24 mx-auto text-gray-400" />
                )}
                <Title order={2} className="mt-4 text-gray-800">{profileData.name}</Title>
                <Text className="text-gray-600 mt-2">Email: {profileData.email}</Text>
                <Text className="text-gray-600">Phone: {profileData.phoneNumber || "Not set"}</Text>
                <Button className="mt-4" variant="outline" color="blue" onClick={open}>
                  Edit Profile
                </Button>
              </div>
            </Card>
          </Tabs.Panel>

          {/* My Properties Tab */}
          <Tabs.Panel value="third">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">My Added Properties</h2>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <Card key={property.id} withBorder shadow="sm" padding="lg" radius="md">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={property.images[0] || "https://via.placeholder.com/400x300"}
                        alt={property.title}
                        className="w-full md:w-1/3 h-40 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <Group position="apart">
                          <Title order={3} className="text-gray-800">{property.title}</Title>
                          <Group>
                            <Button
                              variant="subtle"
                              color="blue"
                              onClick={() => {
                                setSelectedPropertyId(property.propertyId);
                                openEditModal();
                              }}
                            >
                              <MdEdit size={18} />
                            </Button>
                            <Button
                              variant="subtle"
                              color="red"
                              onClick={() => {
                                setSelectedPropertyId(property.propertyId);
                                openDeleteModal();
                              }}
                            >
                              <AiTwotoneDelete size={18} />
                            </Button>
                          </Group>
                        </Group>
                        <Text className="text-gray-600">Price: {property.price} NPR</Text>
                        <Text className="text-gray-600">Location: {property.city}, {property.country}</Text>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Text className="text-gray-500 text-center">No properties added yet.</Text>
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      {/* Modals */}
      <ProfileEditModal opened={opened} close={close} {...profileData} />
      <EditPropertiesModal
        userId={userId}
        opened={editModalOpened}
        onClose={closeEditModal}
        propertyId={selectedPropertyId}
        property={properties.find((p) => p.propertyId === selectedPropertyId)}
      />
      <DeletePropertiesModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        propertyId={selectedPropertyId}
      />
    </div>
  );
};

export default GetProfileData;