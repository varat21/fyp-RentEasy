


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
// import { loadStripe } from '@stripe/stripe-js';


// const GetProfileData = () => {
//   // State and hooks at the top level
//   const [userId, setUserId] = useState(null);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [properties, setProperties] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
//   const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
// const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Zustand store hook
//   const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();

//   // Navigation hook
//   const navigate = useNavigate();

//   // Fetch profile data on component mount
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token not found in localStorage.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const decodedToken = jwtDecode(token);
//         const extractedUserId = decodedToken?.userId;
//         console.log(extractedUserId);

//         if (!extractedUserId) {
//           toast.error("Invalid token. Please log in again.");
//           return;
//         }

//         setUserId(extractedUserId);

//         const response = await axios.get(
//           `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setProfileData(response.data.user);
//           setProperties(response.data.properties || []);
//         } else {
//           console.error(response.data.message);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   // Handle property removal
//   const handleRemoveProperty = (bookingId) => {
//     removeProperty(bookingId);
//     toast.success("Property removed from bookings");
//   };

//   // Handle payment
//  const handlePayment = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     // Validate booked properties
//     if (bookedProperties.length === 0) {
//       toast.error("No properties booked for payment");
//       return;
//     }

//     // Prepare payload
//     const payload = {
//       amount: Math.round(totalAmount * 100), // Convert to cents
//       bookedProperties: bookedProperties.map(p => p.propertyId),
//       userId: userId
//     };

//     console.log("Sending payment request with:", payload);

//     const response = await axios.post(
//       "http://localhost/rent-easy/public/stripePayment/create-payment-intent.php",
//       payload,
//       {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         timeout: 10000
//       }
//     );

//     console.log("Payment intent created:", response.data);

//     // Initialize Stripe
//     const stripe = await loadStripe('pk_test_51R8IUK2awH1yaW8vbHhSuNjOANwljKd5bR7B9ku6j1mSjAGPJnblOGshD0al5lLvQwPA55g6pBVyWJ7IzHFtUYYa00QrBhsPwv');
    
//     // Redirect to Stripe Checkout
//     const result = await stripe.redirectToCheckout({
//       sessionId: response.data.sessionId
//     });

//     if (result.error) {
//       toast.error(result.error.message);
//     } else {
//       // Clear bookings only after successful payment
//       clearBookings();
//       toast.success("Payment completed successfully!");
//       navigate("/payment-success");
//     }
//   } catch (error) {
//     console.error("Payment error details:", {
//       status: error.response?.status,
//       data: error.response?.data,
//       config: error.config
//     });
    
//     const errorMessage = error.response?.data?.error || 
//                        error.message || 
//                        "Payment processing failed";
//     toast.error(errorMessage);
//   }
// };

//   // Calculate average rating
//   const calculateAverageRating = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   // No profile data state
//   if (!profileData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-lg font-semibold text-red-500">
//           No profile data found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 mt-20">
//       <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
//         My Dashboard
//       </h1>

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
//             <h3 className="text-xl font-semibold mb-4 text-left">
//               My Booked Properties
//             </h3>

//             <div className="space-y-6">
//               {bookedProperties.map((property) => (
//                 <Card
//                   key={property.bookingId}
//                   shadow="sm"
//                   padding="lg"
//                   radius="md"
//                   withBorder
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
//                         <div>
//                           <Group>
//                             <Title order={3}>{property.title}</Title>
//                             <Badge variant="filled" size="lg">
//                               Booking #
//                               {bookedProperties.findIndex(
//                                 (p) => p.bookingId === property.bookingId
//                               ) + 1}
//                             </Badge>
//                           </Group>
//                           <Text color="dimmed" className="mt-2">
//                             {property.description}
//                           </Text>
//                         </div>
//                         <Button
//                           onClick={() => handleRemoveProperty(property.bookingId)}
//                           variant="subtle"
//                           color="red"
//                         >
//                           <Trash size={20} />
//                         </Button>
//                       </div>

//                       {property.ratings && property.ratings.length > 0 && (
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
//                           <Text weight={600}>{property.price}</Text>
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
//               ))}

//               <Card
//                 shadow="sm"
//                 padding="lg"
//                 radius="md"
//                 withBorder
//                 className="mt-8"
//               >
//                 <Group position="apart" className="mb-6">
//                   <Title order={3}>Booking Summary</Title>
//                   <div>
//                     <Text size="sm" color="dimmed">
//                       Total Bookings: {bookedProperties.length}
//                     </Text>
//                   </div>
//                 </Group>

//                 <Group position="right" spacing="md">
//                   <Button onClick={() => navigate("/")} variant="outline">
//                     Continue Browsing
//                   </Button>
//                   <Button
//                     onClick={() => setPaymentModalOpen(true)}
//                     variant="filled"
//                   >
//                     Complete Payment
//                   </Button>
//                 </Group>
//               </Card>
//             </div>

//             {/* Payment Modal */}
//             <Modal
//   opened={paymentModalOpen}
//   onClose={() => {
//     if (!paymentProcessing) {
//       setPaymentModalOpen(false);
//       setPaymentSuccess(false);
//     }
//   }}
//   title={paymentSuccess ? "Payment Successful" : "Complete Payment"}
//   centered
// >
//   {paymentSuccess ? (
//     <div className="p-4 text-center">
//       <svg
//         className="w-16 h-16 text-green-500 mx-auto mb-4"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M5 13l4 4L19 7"
//         />
//       </svg>
//       <Text size="lg" weight={500} className="mb-4">
//         Your payment was successful!
//       </Text>
//       <Text color="dimmed" className="mb-6">
//         Thank you for your booking. A confirmation has been sent to your email.
//       </Text>
//       <Button
//         onClick={() => {
//           setPaymentModalOpen(false);
//           setPaymentSuccess(false);
//           handlePayment();
//         }}
//         fullWidth
//       >
//         Close
//       </Button>
//     </div>
//   ) : (
//     <div className="p-4">
//       <Text color="dimmed" className="mb-4">
//         You are about to pay ${Number(totalAmount || 0).toFixed(2)} for {bookedProperties.length} properties.
//       </Text>
      
//       <div className="mb-6">
//         {bookedProperties.map((property, index) => (
//           <div key={index} className="flex justify-between py-2 border-b">
//             <Text>{property.title}</Text>
//             <Text weight={600}>${property.price}</Text>
//           </div>
//         ))}
//         <div className="flex justify-between py-2 font-bold mt-2">
//           <Text>Total Amount:</Text>
//           <Text>${Number(totalAmount || 0).toFixed(2)}</Text>
//         </div>
//       </div>

//       <Button
//         onClick={async () => {
//           setPaymentProcessing(true);
//           try {
//             // 1. Create a payment intent on your backend
//             const token = localStorage.getItem("token");
//             const response = await axios.post(
//               "http://localhost/rent-easy/public/stripePayment/create-payment-intent.php",
//               {
//                 amount: totalAmount * 100, // Convert to cents
//                 bookedProperties: bookedProperties.map(p => p.propertyId),
//                 userId: userId
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             // 2. Initialize Stripe
//             const stripe = await loadStripe('pk_test_51R8IUK2awH1yaW8vbHhSuNjOANwljKd5bR7B9ku6j1mSjAGPJnblOGshD0al5lLvQwPA55g6pBVyWJ7IzHFtUYYa00QrBhsPwv');
            
//             // 3. Redirect to Stripe Checkout
//             const result = await stripe.redirectToCheckout({
//               sessionId: response.data.sessionId
//             });

//             if (result.error) {
//               toast.error(result.error.message);
//             } else {
//               setPaymentSuccess(true);
//             }
//           } catch (error) {
//             console.error("Payment error:", error);
//             toast.error("Payment failed. Please try again.");
//           } finally {
//             setPaymentProcessing(false);
//           }
//         }}
//         loading={paymentProcessing}
//         fullWidth
//         disabled={bookedProperties.length === 0}
//       >
//         {paymentProcessing ? "Processing..." : "Pay with Stripe"}
//       </Button>
//     </div>
//   )}
// </Modal>
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
//                 <div className="text-sm font-medium text-black-400 ">
//                   Name:
//                 </div>
//                 <div className="text-lg font-semibold text-gray-800  capitalize">
//                   {profileData.name || "N/A"}
//                 </div>
//               </div>
//               <div className="flex mt-4 items-center justify-center">
//                 <div className="text-sm font-medium text-gray-700 ">
//                   Address:
//                 </div>
//                 <p className="text-lg font-semibold text-gray-800  capitalize">
//                   {profileData.address || "N/A"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-between p-10">
//               <div>
//                 <span className="text-sm font-medium text-gray-700">
//                   Phone:
//                 </span>
//                 <span className="text-lg font-semibold text-gray-800 ">
//                   {profileData.phoneNumber || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700 ">
//                   Gender:
//                 </span>
//                 <span className="text-lg font-semibold text-gray-800 ">
//                   {profileData.gender || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700 ">
//                   Email:
//                 </span>
//                 <span className="text-lg font-semibold text-gray-800 ">
//                   {profileData.email || "N/A"}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium text-gray-700">
//                   User Type:
//                 </span>
//                 <span className="text-lg font-semibold text-gray-800 ">
//                   {profileData.userType || "N/A"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4">
//               {/* <Button type="submit" mt="lg" onClick={open}> */}
//               <Button
//                             variant="outline"
//                             // leftIcon={<MdEdit size={16} />}
//                             onClick={open}>
//                 Edit Profile
//               </Button>
//             </div>
//           </div>

//           <ProfileEditModal
//             opened={opened}
//             close={close}
//             name={profileData.name}
//             address={profileData.address}
//             phoneNumber={profileData.phoneNumber}
//             gender={profileData.gender}
//             password={profileData.password}
//             id={profileData.id}
//             email={profileData.email}
//           />
//         </Tabs.Panel>

//         {/* My Properties Tab */}
//         <Tabs.Panel value="third" pt="xs">
//           <div className="p-6 bg-gray-50 text-center text-gray-700 font-semibold">
//             <h3 className="text-xl font-semibold mb-4 text-left">
//               Added Properties
//             </h3>
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
//                         <Group>
//                           <Title order={3}>{property.title}</Title>
//                         </Group>
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
//                               value: ` ${property.price}`,
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

//       {/* Edit and Delete Modals */}
//       {userId && (
//         <EditPropertiesModal
//           userId={userId}
//           opened={editModalOpened}
//           onClose={closeEditModal}
//           propertyId={selectedPropertyId}
//           property={properties.find((p) => p.propertyId === selectedPropertyId)}
//           image={
//             properties.find((p) => p.propertyId === selectedPropertyId)
//               ?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"
//           }
//         />
//       )}

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
import { Tabs, Divider, Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import useBookingStore from "../stores/useBookingStore";
import { Card, Group, Title, Badge, Rating, Text } from "@mantine/core";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
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
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import { loadStripe } from '@stripe/stripe-js';

const GetProfileData = () => {
  // State and hooks at the top level
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Zustand store hook
  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
let booking_id = bookedProperties ;
  // Navigation hook
  const navigate = useNavigate();

  // Payment verification useEffect
  useEffect(() => {
    const verifyPaymentOnRedirect = async () => {
      const query = new URLSearchParams(window.location.search);
      const sessionId = query.get('session_id');
      const paymentSuccess = query.get('payment_success');
      
      if (sessionId) {
        await verifyPayment(sessionId);
        // Clean up URL
        navigate(window.location.pathname, { replace: true });
      }
      
      if (paymentSuccess === 'true') {
        toast.success("Payment completed successfully!");
        navigate(window.location.pathname, { replace: true });
      }
    };

    verifyPaymentOnRedirect();
  }, [navigate]);

  // Fetch profile data on component mount
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

        setUserId(extractedUserId);

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

  const verifyPayment = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to verify payment");
        return;
      }

      const response = await axios.get(
        `http://localhost/rent-easy/public/stripePayment/verify-payment.php?session_id=${sessionId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        }
      );
      
      if (response.data.success) {
        if (response.data.payment_status === 'completed') {
          toast.success("Payment verified successfully!");
          clearBookings();
          
          // Optional: Redirect to a success page
          navigate("/payment-success", {
            state: {
              paymentDetails: response.data.payment
            }
          });
        } else {
          toast.error("Payment not yet completed");
        }
      } else {
        toast.error(response.data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      const errorMessage = error.response?.data?.error || 
                         error.message || 
                         "Payment verification failed";
      toast.error(errorMessage);
    }
  };

  // Handle property removal
  const handleRemoveProperty = (bookingId) => {
    removeProperty(bookingId);
    toast.success("Property removed from bookings");
  };

  // Handle payment
 // Handle payment
// Payment handling in your React component
const handlePayment = async () => {
  try {
    setPaymentProcessing(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (bookedProperties.length === 0) {
      toast.error("No properties booked for payment");
      return;
    }

    // Calculate total amount in cents
    const amountInCents = Math.round(totalAmount * 100);

    // Create payload
    const payload = {
      amount: amountInCents,
      bookedProperties: bookedProperties.map(p => p.propertyId),
      customerEmail: profileData?.email // Include customer email if available
    };

    // Create checkout session
    const response = await axios.post(
      "http://localhost/rent-easy/public/stripePayment/create-payment-intent.php",
      payload,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Payment failed");
    }

    // Initialize Stripe
    const stripe = await loadStripe('pk_test_51R8IUK2awH1yaW8vbHhSuNjOANwljKd5bR7B9ku6j1mSjAGPJnblOGshD0al5lLvQwPA55g6pBVyWJ7IzHFtUYYa00QrBhsPwv');
    
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.sessionId
    });

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error("Payment error:", error);
    toast.error(error.message || "Payment processing failed");
    setPaymentModalOpen(false);
  } finally {
    setPaymentProcessing(false);
  }
};

// Payment verification after redirect
useEffect(() => {
  const verifyPayment = async () => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to verify payment");
          return;
        }

        const response = await axios.get(
          `http://localhost/rent-easy/public/stripePayment/verify-payment.php?session_id=${sessionId}`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.data.success) {
          if (response.data.payment_status === 'completed') {
            toast.success("Payment completed successfully!");
            clearBookings();
            navigate('/payment-success', { 
              state: { 
                paymentDetails: response.data.payment 
              } 
            });
          } else {
            toast.error("Payment not completed");
          }
        } else {
          toast.error(response.data.error || "Payment verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(error.response?.data?.error || "Payment verification failed");
      }
    }
  };

  verifyPayment();
}, [navigate, clearBookings]);

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // No profile data state
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

      <Tabs color="teal" defaultValue="first" className="mx-auto bg-white shadow-md rounded-xl">
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">
            Booked Properties
          </Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">
            My Profile
          </Tabs.Tab>
          <Tabs.Tab value="third" className="text-lg font-semibold">
            My Properties
          </Tabs.Tab>
        </Tabs.List>

        {/* Booked Properties Tab */}
        <Tabs.Panel value="first" pt="xs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-left">
              My Booked Properties
            </h3>

            <div className="space-y-6">
              {bookedProperties.map((property) => (
                <Card
                  key={property.bookingId}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                      <img
                        src={property.images?.[0] || "/default-property.jpg"}
                        alt={property.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Group>
                            <Title order={3}>{property.title}</Title>
                            <Badge variant="filled" size="lg">
                              Booking #
                              {bookedProperties.findIndex(
                                (p) => p.bookingId === property.bookingId
                              ) + 1}
                            </Badge>
                          </Group>
                          <Text color="dimmed" className="mt-2">
                            {property.description}
                          </Text>
                        </div>
                        <Button
                          onClick={() => handleRemoveProperty(property.bookingId)}
                          variant="subtle"
                          color="red"
                        >
                          <Trash size={20} />
                        </Button>
                      </div>

                      {property.ratings && property.ratings.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          <Rating
                            value={calculateAverageRating(property.ratings)}
                            readOnly
                            size="sm"
                          />
                          <Text size="sm" color="dimmed">
                            {calculateAverageRating(property.ratings)} (
                            {property.ratings.length} reviews)
                          </Text>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Text size="sm" color="dimmed">
                            Price
                          </Text>
                          <Text weight={600}>{property.price}</Text>
                        </div>
                        <div>
                          <Text size="sm" color="dimmed">
                            Location
                          </Text>
                          <Text weight={600}>
                            {property.city}, {property.country}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" color="dimmed">
                            Size
                          </Text>
                          <Text weight={600}>{property.dimension} sqft</Text>
                        </div>
                        <div>
                          <Text size="sm" color="dimmed">
                            Booked On
                          </Text>
                          <Text weight={600}>
                            {moment(property.bookingDate).format("MMM DD, YYYY")}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="mt-8"
              >
                <Group position="apart" className="mb-6">
                  <Title order={3}>Booking Summary</Title>
                  <div>
                    <Text size="sm" color="dimmed">
                      Total Bookings: {bookedProperties.length}
                    </Text>
                  </div>
                </Group>

                <Group position="right" spacing="md">
                  <Button onClick={() => navigate("/")} variant="outline">
                    Continue Browsing
                  </Button>
                  <Button
                    onClick={() => setPaymentModalOpen(true)}
                    variant="filled"
                  >
                    Complete Payment
                  </Button>
                </Group>
              </Card>
            </div>

            {/* Payment Modal */}
            <Modal
              opened={paymentModalOpen}
              onClose={() => {
                if (!paymentProcessing) {
                  setPaymentModalOpen(false);
                  setPaymentSuccess(false);
                }
              }}
              title={paymentSuccess ? "Payment Successful" : "Complete Payment"}
              centered
            >
              {paymentSuccess ? (
                <div className="p-4 text-center">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <Text size="lg" weight={500} className="mb-4">
                    Your payment was successful!
                  </Text>
                  <Text color="dimmed" className="mb-6">
                    Thank you for your booking. A confirmation has been sent to your email.
                  </Text>
                  <Button
                    onClick={() => {
                      setPaymentModalOpen(false);
                      setPaymentSuccess(false);
                    }}
                    fullWidth
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div className="p-4">
                  <Text color="dimmed" className="mb-4">
                    You are about to pay ${Number(totalAmount || 0).toFixed(2)} for {bookedProperties.length} properties.
                  </Text>
                  
                  <div className="mb-6">
                    {bookedProperties.map((property, index) => (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <Text>{property.title}</Text>
                        <Text weight={600}>${property.price}</Text>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-bold mt-2">
                      <Text>Total Amount:</Text>
                      <Text>${Number(totalAmount || 0).toFixed(2)}</Text>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    loading={paymentProcessing}
                    fullWidth
                    disabled={bookedProperties.length === 0}
                  >
                    {paymentProcessing ? "Processing..." : "Pay with Stripe"}
                  </Button>
                </div>
              )}
            </Modal>
          </motion.div>
        </Tabs.Panel>

        {/* My Profile Tab */}
        <Tabs.Panel value="second" pt="xs">
          <div className="bg-white dark:bg-gray-300 rounded-xl shadow-lg p-6">
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
                <div className="text-sm font-medium text-black-400 ">
                  Name:
                </div>
                <div className="text-lg font-semibold text-gray-800  capitalize">
                  {profileData.name || "N/A"}
                </div>
              </div>
              <div className="flex mt-4 items-center justify-center">
                <div className="text-sm font-medium text-gray-700 ">
                  Address:
                </div>
                <p className="text-lg font-semibold text-gray-800  capitalize">
                  {profileData.address || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between p-10">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Phone:
                </span>
                <span className="text-lg font-semibold text-gray-800 ">
                  {profileData.phoneNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 ">
                  Gender:
                </span>
                <span className="text-lg font-semibold text-gray-800 ">
                  {profileData.gender || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 ">
                  Email:
                </span>
                <span className="text-lg font-semibold text-gray-800 ">
                  {profileData.email || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  User Type:
                </span>
                <span className="text-lg font-semibold text-gray-800 ">
                  {profileData.userType || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={open}
              >
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

        {/* My Properties Tab */}
        <Tabs.Panel value="third" pt="xs">
          <div className="p-6 bg-gray-50 text-center text-gray-700 font-semibold">
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
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <Group>
                          <Title order={3}>{property.title}</Title>
                        </Group>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            leftIcon={<MdEdit size={16} />}
                            onClick={() => {
                              setSelectedPropertyId(property.propertyId);
                              openEditModal();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            color="red"
                            leftIcon={<AiTwotoneDelete size={16} />}
                            onClick={() => {
                              setSelectedPropertyId(property.propertyId);
                              openDeleteModal();
                            }}
                          >
                            Delete
                          </Button>
                        </div>
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
                              value: `${property.city}, ${property.country}`,
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
        </Tabs.Panel>
      </Tabs>

      {/* Edit and Delete Modals */}
      {userId && (
        <EditPropertiesModal
          userId={userId}
          opened={editModalOpened}
          onClose={closeEditModal}
          propertyId={selectedPropertyId}
          property={properties.find((p) => p.propertyId === selectedPropertyId)}
          image={
            properties.find((p) => p.propertyId === selectedPropertyId)
              ?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"
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