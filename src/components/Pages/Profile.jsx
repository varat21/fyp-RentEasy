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
// import { v4 as uuidv4 } from "uuid";
// import CryptoJS from "crypto-js";

// // Custom toast wrapper to log messages
// const customToast = {
//   success: (message) => {
//     console.log(`Toast Success: ${message}`);
//     toast.success(message);
//   },
//   error: (message) => {
//     console.log(`Toast Error: ${message}`);
//     toast.error(message);
//   },
// };

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
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

//   // Zustand store
//   const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
//   console.log({ bookedProperties, totalAmount, removeProperty, clearBookings });

//   const navigate = useNavigate();

//   // Generate success URL with actual values
//   const generateSuccessUrl = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return "";

//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken?.userId;

//     // Validate bookedProperties and totalAmount
//     if (!bookedProperties.length || totalAmount <= 0) {
//       console.error("No booked properties or invalid total amount");
//       return "";
//     }

//     const firstProperty = bookedProperties[0];
//     const bookingId = firstProperty?.bookingId || `bk_${Date.now()}`;
//     const propertyId = firstProperty?.propertyId || firstProperty?.id;
//     const transaction_uuid = uuidv4();

//     const amount = totalAmount > 0 ? totalAmount : firstProperty?.price || 0;

//     return `http://localhost:5173/paymentSuccess?booking_id=${bookingId}&amount=${amount}&propertyId=${propertyId}&transaction_uuid=${transaction_uuid}&user_id=${userId}`;
//   };

//   // Form data for eSewa payment
//   const [formData, setFormData] = useState({
//     amount: "0",
//     tax_amount: "0",
//     total_amount: "0",
//     transaction_uuid: uuidv4(),
//     product_service_charge: "0",
//     product_delivery_charge: "0",
//     product_code: "EPAYTEST",
//     success_url: "",
//     failure_url: "https://localhost:5173/payment-failure",
//     signed_field_names: "total_amount,transaction_uuid,product_code",
//     signature: "",
//     secret: "8gBm/:&EnhH.1/q",
//   });

//   // Update formData when totalAmount or bookedProperties change
//   useEffect(() => {
//     if (!bookedProperties.length || totalAmount <= 0) {
//       console.warn("No booked properties or invalid total amount");
//       return;
//     }

//     const amount = totalAmount > 0 ? totalAmount.toString() : bookedProperties[0]?.price?.toString() || "0";
//     const taxAmount = "0";
//     const serviceCharge = "0";
//     const deliveryCharge = "0";
//     const totalAmountCalculated = (
//       Number(amount) +
//       Number(taxAmount) +
//       Number(serviceCharge) +
//       Number(deliveryCharge)
//     ).toString();

//     const successUrl = generateSuccessUrl();

//     setFormData((prev) => ({
//       ...prev,
//       amount: amount,
//       tax_amount: taxAmount,
//       product_service_charge: serviceCharge,
//       product_delivery_charge: deliveryCharge,
//       total_amount: totalAmountCalculated,
//       transaction_uuid: uuidv4(),
//       success_url: successUrl,
//     }));
//   }, [totalAmount, bookedProperties]);

//   // Generate signature for eSewa payment
//   const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
//     const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
//     const hash = CryptoJS.HmacSHA256(hashString, secret);
//     const signature = CryptoJS.enc.Base64.stringify(hash);
//     return signature;
//   };

//   // Calculate signature when formData changes
//   useEffect(() => {
//     const { total_amount, transaction_uuid, product_code, secret } = formData;
//     if (total_amount && transaction_uuid && product_code) {
//       const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
//       setFormData((prev) => ({ ...prev, signature: hashedSignature }));
//     }
//   }, [formData.total_amount, formData.transaction_uuid]);

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

//   const handleRemoveProperty = (bookingId) => {
//     removeProperty(bookingId);
//     customToast.success("Property removed from bookings");
//   };

//   const calculateAverageRating = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   const handlePaymentMethodSelect = (method) => {
//     setSelectedPaymentMethod(method);
//   };

//   const handlePaymentSubmit = () => {
//     if (!selectedPaymentMethod) {
//       customToast.error("Please select a payment method");
//       return;
//     }

//     if (selectedPaymentMethod === "esewa") {
//       if (Number(formData.total_amount) <= 0) {
//         customToast.error("Total amount must be greater than 0");
//         return;
//       }
//       setPaymentProcessing(true);
//       document.getElementById("esewa-form").submit();
//     } else {
//       customToast.success(`Payment method ${selectedPaymentMethod} selected!`);
//       setPaymentModalOpen(false);
//     }
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

//   const handleAddPropertyClick = () => {
//     navigate("/addProperties");
//   };

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
//           <Tabs.Tab
//             value="fourth"
//             className="text-lg font-medium"
//             onClick={handleAddPropertyClick}
//           >
//             Add Property
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
//                             Booking #{bookedProperties.findIndex((p) => p.bookingId === property.bookingId) + 1}
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
//                             {calculateAverageRating(property.ratings)} ({property.ratings.length} reviews)
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
//                   disabled={bookedProperties.length === 0 || totalAmount <= 0}
//                 >
//                   Complete Payment
//                 </Button>
//               </Group>
//             </Card>
//           </motion.div>
//         </Tabs.Panel>

//         {/* My Profile Tab */}
//         <Tabs.Panel value="second" pt="xs">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
//             <h2 className="text-xl font-semibold mb-6 text-gray-800">My Profile</h2>
//             <div className="text-center mb-6">
//               {profileData.image ? (
//                 <img
//                   src={profileData.image}
//                   alt="User Profile"
//                   className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
//                 />
//               ) : (
//                 <div className="w-24 h-24 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
//                   {profileData.name ? profileData.name.charAt(0).toUpperCase() : "N/A"}
//                 </div>
//               )}
//             </div>

//             <div className="space-y-4 text-center">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Name</p>
//                 <p className="text-lg font-semibold text-gray-800 capitalize">
//                   {profileData.name || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Email</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.email || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Phone</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.phoneNumber || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <Badge color="green" size="lg">
//                   Active
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex justify-center mt-6">
//               <Button variant="filled" color="blue" onClick={open}>
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
//         size="lg"
//       >
//         <div className="p-4 flex flex-col md:flex-row gap-6">
//           {/* Payment Methods */}
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {/* eSewa Mobile Wallet */}
//               <div
//                 className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
//                   selectedPaymentMethod === "esewa"
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200"
//                 }`}
//                 onClick={() => handlePaymentMethodSelect("esewa")}
//               >
//                 <img
//                   src="/esewa.png"
//                   alt="eSewa Mobile Wallet"
//                   className="w-20 h-15 mb-2"
//                 />
//                 <p className="text-sm text-center">eSewa Mobile Wallet</p>
//               </div>

//               {/* IME Pay */}
//               <div
//                 className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
//                   selectedPaymentMethod === "imepay"
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200"
//                 }`}
//                 onClick={() => handlePaymentMethodSelect("imepay")}
//               >
//                 <img
//                   src="https://via.placeholder.com/40?text=IME"
//                   alt="IME Pay"
//                   className="w-10 h-10 mb-2"
//                 />
//                 <p className="text-sm text-center">IME Pay</p>
//               </div>

//               {/* Cash on Delivery */}
//               <div
//                 className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
//                   selectedPaymentMethod === "cod"
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200"
//                 }`}
//                 onClick={() => handlePaymentMethodSelect("cod")}
//               >
//                 <img
//                   src="https://via.placeholder.com/40?text=COD"
//                   alt="Cash on Delivery"
//                   className="w-10 h-10 mb-2"
//                 />
//                 <p className="text-sm text-center">Cash on Delivery</p>
//               </div>
//             </div>

//             {/* Hidden eSewa Form */}
//             {selectedPaymentMethod === "esewa" && (
//               <form
//                 id="esewa-form"
//                 action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
//                 method="POST"
//                 className="hidden"
//               >
//                 <input type="hidden" name="amount" value={formData.amount} />
//                 <input type="hidden" name="tax_amount" value={formData.tax_amount} />
//                 <input type="hidden" name="total_amount" value={formData.total_amount} />
//                 <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
//                 <input type="hidden" name="product_code" value={formData.product_code} />
//                 <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
//                 <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
//                 <input type="hidden" name="success_url" value={formData.success_url} />
//                 <input type="hidden" name="failure_url" value={formData.failure_url} />
//                 <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
//                 <input type="hidden" name="signature" value={formData.signature} />
//               </form>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="w-full md:w-1/3">
//             <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
//             <div className="p-4 border rounded-lg">
//               <div className="flex justify-between mb-2">
//                 <p className="text-sm font-semibold">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
//               </div>
//               <Divider className="my-2" />
//               <div className="flex justify-between">
//                 <p className="text-lg font-semibold">Total Amount</p>
//                 <p className="text-lg font-semibold text-orange-500">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Proceed Button */}
//         <div className="mt-6 flex justify-end">
//           <Button
//             onClick={handlePaymentSubmit}
//             loading={paymentProcessing}
//             disabled={!selectedPaymentMethod}
//           >
//             {paymentProcessing ? "Processing..." : "Proceed to Pay"}
//           </Button>
//         </div>
//       </Modal>
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
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

// Custom toast wrapper to log messages
const customToast = {
  success: (message) => {
    console.log(`Toast Success: ${message}`);
    toast.success(message);
  },
  error: (message) => {
    console.log(`Toast Error: ${message}`);
    toast.error(message);
  },
};

const GetProfileData = () => {
  // State and hooks
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Zustand store
  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
  console.log({ bookedProperties, totalAmount, removeProperty, clearBookings });

  const navigate = useNavigate();

  // Generate success URL with actual values
  const generateSuccessUrl = () => {
    const token = localStorage.getItem("token");
    if (!token) return "";

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.userId;

    // Validate bookedProperties and totalAmount
    if (!bookedProperties.length || totalAmount <= 0) {
      console.error("No booked properties or invalid total amount");
      return "";
    }

    const firstProperty = bookedProperties[0];
    const bookingId = firstProperty?.bookingId || `bk_${Date.now()}`; // Use bookingId, not booking_id
    const propertyId = firstProperty?.propertyId || firstProperty?.id; // Fallback to id if propertyId is missing
    const transaction_uuid = uuidv4();

    // Ensure totalAmount is a valid number
    const amount = totalAmount > 0 ? totalAmount : firstProperty?.price || 0;

    return `http://localhost:5173/paymentSuccess?booking_id=${bookingId}&amount=${amount}&propertyId=${propertyId}&transaction_uuid=${transaction_uuid}&user_id=${userId}`;
  };

  // Form data for eSewa payment
  const [formData, setFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "",
    failure_url: "https://localhost:5173/payment-failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // Update formData when totalAmount or bookedProperties change
  useEffect(() => {
    if (!bookedProperties.length || totalAmount <= 0) {
      console.warn("No booked properties or invalid total amount");
      return;
    }

    const amount = totalAmount > 0 ? totalAmount.toString() : bookedProperties[0]?.price?.toString() || "0";
    const taxAmount = "0";
    const serviceCharge = "0";
    const deliveryCharge = "0";
    const totalAmountCalculated = (
      Number(amount) +
      Number(taxAmount) +
      Number(serviceCharge) +
      Number(deliveryCharge)
    ).toString();

    const successUrl = generateSuccessUrl();

    setFormData((prev) => ({
      ...prev,
      amount: amount,
      tax_amount: taxAmount,
      product_service_charge: serviceCharge,
      product_delivery_charge: deliveryCharge,
      total_amount: totalAmountCalculated,
      transaction_uuid: uuidv4(),
      success_url: successUrl,
    }));
  }, [totalAmount, bookedProperties]);

  // Generate signature for eSewa payment
  const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);
    return signature;
  };

  // Calculate signature when formData changes
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    if (total_amount && transaction_uuid && product_code) {
      const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
      setFormData((prev) => ({ ...prev, signature: hashedSignature }));
    }
  }, [formData.total_amount, formData.transaction_uuid]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken?.userId;
        setUserId(extractedUserId);

        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
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

  const handleRemoveProperty = (bookingId) => {
    removeProperty(bookingId);
    customToast.success("Property removed from bookings");
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      customToast.error("Please select a payment method");
      return;
    }

    if (selectedPaymentMethod === "esewa") {
      if (Number(formData.total_amount) <= 0) {
        customToast.error("Total amount must be greater than 0");
        return;
      }
      setPaymentProcessing(true);
      document.getElementById("esewa-form").submit();
    } else {
      customToast.success(`Payment method ${selectedPaymentMethod} selected!`);
      setPaymentModalOpen(false);
    }
  };

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

  const handleAddPropertyClick = () => {
    navigate("/addProperties");
  };

  return (
    <div className="bg-white p-6 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">My Dashboard</h1>

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
          <Tabs.Tab
            value="fourth"
            className="text-lg font-medium"
            onClick={handleAddPropertyClick}
          >
            Add Property
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
            <h3 className="text-xl font-semibold mb-4 text-left">My Booked Properties</h3>

            {bookedProperties.length > 0 ? (
              bookedProperties.map((property) => (
                <Card
                  key={property.bookingId}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  className="mb-6"
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
                        <Group>
                          <Title order={3}>{property.title}</Title>
                          <Badge variant="filled" size="lg">
                            Booking #{bookedProperties.findIndex((p) => p.bookingId === property.bookingId) + 1}
                          </Badge>
                        </Group>
                        <Button
                          onClick={() => handleRemoveProperty(property.bookingId)}
                          variant="subtle"
                          color="red"
                        >
                          <Trash size={20} />
                        </Button>
                      </div>

                      <Text color="dimmed" className="mt-2">
                        {property.description}
                      </Text>

                      {property.ratings?.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          <Rating
                            value={calculateAverageRating(property.ratings)}
                            readOnly
                            size="sm"
                          />
                          <Text size="sm" color="dimmed">
                            {calculateAverageRating(property.ratings)} ({property.ratings.length} reviews)
                          </Text>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Text size="sm" color="dimmed">
                            Price
                          </Text>
                          <Text weight={600}>Rs. {property.price}</Text>
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
              ))
            ) : (
              <Text color="dimmed">No properties booked yet.</Text>
            )}

            <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
              <Group position="apart" className="mb-6">
                <Title order={3}>Booking Summary</Title>
                <Text size="sm" color="dimmed">
                  Total Bookings: {bookedProperties.length}
                </Text>
              </Group>

              <Group position="right" spacing="md">
                <Button onClick={() => navigate("/")} variant="outline">
                  Continue Browsing
                </Button>
                <Button
                  onClick={() => setPaymentModalOpen(true)}
                  variant="filled"
                  disabled={bookedProperties.length === 0 || totalAmount <= 0}
                >
                  Complete Payment
                </Button>
              </Group>
            </Card>
          </motion.div>
        </Tabs.Panel>

        {/* My Profile Tab */}
         <Tabs.Panel value="second" pt="xs">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
            {/* <h2 className="text-xl font-semibold mb-6 text-gray-800">My Profile</h2> */}
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
                />                </div>
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
                <Badge color="green" size="lg">
                  Active
                </Badge>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="filled" color="blue" onClick={open}>
                Edit Profile
              </Button>
            </div>
          </div>
        </Tabs.Panel>

        {/* My Properties Tab */}
        <Tabs.Panel value="third" pt="xs">
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
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
                        <Title order={3}>{property.title}</Title>
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
                              value: `Rs. ${property.price}`,
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

      {/* Modals */}
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

      <Modal
        opened={paymentModalOpen}
        onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
        title="Complete Payment"
        centered
        size="lg"
      >
        <div className="p-4 flex flex-col md:flex-row gap-6">
          {/* Payment Methods */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* eSewa Mobile Wallet */}
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "esewa"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("esewa")}
              >
                <img
                  src="/esewa.png"
                  alt="eSewa Mobile Wallet"
                  className="w-20 h-15 mb-2"
                />
                <p className="text-sm text-center">eSewa Mobile Wallet</p>
              </div>

              {/* IME Pay */}
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "imepay"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("imepay")}
              >
                <img
                  src="https://via.placeholder.com/40?text=IME"
                  alt="IME Pay"
                  className="w-10 h-10 mb-2"
                />
                <p className="text-sm text-center">IME Pay</p>
              </div>

              {/* Cash on Delivery */}
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "cod"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("cod")}
              >
                <img
                  src="https://via.placeholder.com/40?text=COD"
                  alt="Cash on Delivery"
                  className="w-10 h-10 mb-2"
                />
                <p className="text-sm text-center">Cash on Delivery</p>
              </div>
            </div>

            {/* Hidden eSewa Form */}
            {selectedPaymentMethod === "esewa" && (
              <form
                id="esewa-form"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                className="hidden"
              >
                <input type="hidden" name="amount" value={formData.amount} />
                <input type="hidden" name="tax_amount" value={formData.tax_amount} />
                <input type="hidden" name="total_amount" value={formData.total_amount} />
                <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
                <input type="hidden" name="product_code" value={formData.product_code} />
                <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
                <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
                <input type="hidden" name="success_url" value={formData.success_url} />
                <input type="hidden" name="failure_url" value={formData.failure_url} />
                <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
                <input type="hidden" name="signature" value={formData.signature} />
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total Amount</p>
                <p className="text-lg font-semibold text-orange-500">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handlePaymentSubmit}
            loading={paymentProcessing}
            disabled={!selectedPaymentMethod}
          >
            {paymentProcessing ? "Processing..." : "Proceed to Pay"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default GetProfileData;