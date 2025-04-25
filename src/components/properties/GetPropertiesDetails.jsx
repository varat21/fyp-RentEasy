// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import moment from "moment";
// import { motion } from "framer-motion";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import RatingModal from "./RatingModal";
// import { Button, Rating } from "@mantine/core";
// import { toast } from "react-hot-toast";
// import useBookingStore from "../stores/useBookingStore";
// import { jwtDecode } from "jwt-decode";
// import {
//   FaMoneyBillAlt,
//   FaRuler,
//   FaMapMarkerAlt,
//   FaRoad,
//   FaCompass,
//   FaCalendarAlt,
//   FaPhone,
//   FaEye,
//   FaStar,
// } from "react-icons/fa";
// import 'leaflet/dist/leaflet.css';

// // PropertiesViews Component
// export
// const PropertiesViews = ({ id }) => {
//   const [totalViews, setTotalViews] = useState(0); // State to store total views

//   useEffect(() => {
//     // Function to fetch the total views
//     const fetchViews = async () => {
//       try {
//         // Make a GET request to the PHP script
//         const response = await axios.get(
//           `http://localhost/rent-easy/public/update_views.php?propertyId=${id}`
//         );

//         // If the request is successful, update the total views
//         if (response.data.success) {
//           setTotalViews(response.data.views);
//         } else {
//           console.error(response.data.message); // Log error message
//         }
//       } catch (error) {
//         console.error("Error fetching views:", error); // Log any errors
//       }
//     };

//     fetchViews(); // Call the function to fetch views
//   }, [id]); // Re-run when the `id` changes

//   return (
//     <div className="bg-white p-5 rounded-lg text-center flex  items-center gap-3">
//       {/* <div className="mb-2"> */}
//         <FaEye className="text-lg text-black-500" /> {/* Eye icon */}
//       {/* </div> */}
//       {/* <p className="text-sm text-gray-800">Total Views</p> */}
//       <p className="text-gray-700 text-md ">{totalViews}</p> {/* Display total views */}
//     </div>
//   );
// };
// // GetPropertyDetails Component
// const GetPropertyDetails = () => {
//   const { bookedProperties, totalAmount, removeProperty, clearBookings } =
//     useBookingStore();
//   console.log("Booked Properties:", bookedProperties);
//   const navigate = useNavigate();

//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false); // State for scroll behavior

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
//         );
//         console.log("API Response:", data); // 🔥 Log API response

//         if (data.success && data.properties?.length) {
//           const fetchedProperty = data.properties[0];

//           setProperty({
//             ...fetchedProperty,
//             images: [...new Set(fetchedProperty.images || [])], // Remove duplicate images
//           });

//           setSelectedImage(fetchedProperty.images?.[0] || "/default-image.jpg");
//         } else {
//           setError(data.message || "Property not found");
//         }
//       } catch {
//         setError("Error connecting to the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [id]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleBooking = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Check if the property is already booked
//     if (property?.status === "booked") {
//       toast.error("This property is already booked.");
//       return;
//     }

//     try {
//       // Decode the token to get the user ID
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken?.userId; // Adjust based on your token structure
//       if (!userId) {
//         toast.error("Invalid token. Please log in again.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("property_id", id);
//       formData.append("user_id", userId); // Appending user ID from decoded token
//       formData.append("id", userId);
//       formData.append("status", "pending");

//       const response = await axios.post(
//         "http://localhost/rent-easy/public/bookProperty.php",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Booking response:", response.data);

//       if (response.data.success) {
//         // Add the property to the booking store
//         useBookingStore.getState().bookProperty(property);
//         toast.success("Property booked successfully!");
//         // Navigate to the Property.jsx component
//         navigate("/profile?tab=third");
//       } else {
//         toast.error(response.data.message || "Booking failed.");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error("An error occurred while booking the property.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center p-10 text-xl font-semibold text-gray-700">
//         Loading property details...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 p-10 text-lg font-medium">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="mx-auto p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Property Banner */}
//       <div className="w-full h-72 md:h-[450px] overflow-hidden rounded-xl shadow-lg">
//         <img
//           src={selectedImage}
//           alt="Property Banner"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Image Gallery */}
//       <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
//         {Array.isArray(property?.images) &&
//           property.images
//             .filter((img) => img)
//             .map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Property Image ${index + 1}`}
//                 className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition duration-300"
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//       </div>
//       <PropertiesViews id={id} />

//       {/* Property Details Section */}
//       <Rating
//         value={
//           property.ratings.reduce((acc, r) => acc + r.rating, 0) /
//           property.ratings.length
//         }
//         readOnly
//         size="lg"
//       />
//         <span className="text-xl font-semibold text-gray-900">
//         {(
//           property.ratings.reduce((acc, r) => acc + r.rating, 0) /
//           property.ratings.length
//         ).toFixed(1)}{" "}
//         ( {property.ratings.length}{" "}
//         {property.ratings.length === 1 ? "review" : "reviews"})
//       </span>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

//         {/* Left Column - Property Info */}
//         <div className="md:col-span-2">
//           <h1 className="text-4xl font-bold text-gray-900">
//             {property?.title}
//           </h1>

//           <p className="text-gray-600 mt-3 text-lg">{property?.description}</p>

//           {/* Property Details Grid */}
//           <div className="flex justify-center">
//             <div className="grid grid-cols-2 md:grid-cols-8 gap-6 mt-6 w-full">
//               {/* Grid Items with Icons */}
//               {[
//                 {
//                   label: "Price",
//                   value: ` ${property?.price}`,
//                   icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
//                 },
//                 {
//                   label: "Size",
//                   value: `${property?.dimension} sqft`,
//                   icon: <FaRuler className="text-2xl text-green-500" />,
//                 },
//                 {
//                   label: "Location",
//                   value: `${property?.city}, ${property?.country}`,
//                   icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
//                 },
//                 {
//                   label: "Road Type",
//                   value: property?.road_type,
//                   icon: <FaRoad className="text-2xl text-purple-500" />,
//                 },
//                 {
//                   label: "Facing",
//                   value: property?.property_face,
//                   icon: <FaCompass className="text-2xl text-yellow-500" />,
//                 },
//                 {
//                   label: "Posted on",
//                   value: moment(property?.uploaded_at).format("MMM Do YYYY"),
//                   icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
//                 },
//               ].map((detail, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
//                 >
//                   <div className="mb-2">{detail.icon}</div>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {detail.label}
//                   </p>
//                   <p className="text-gray-700 text-md mt-1">{detail.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Owner Info */}
//         <div className="bg-white p-6 rounded-lg shadow-md fixed top-4 right-4 z-50">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Owner Details
//           </h2>

//           {/* Owner Avatar */}
//           <div className="flex items-center gap-4 mt-4">
//             <img
//               src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&color=fff&size=100`}
//               alt="Owner Avatar"
//               className="w-16 h-16 rounded-full shadow-md"
//             />
//             <div>
//               <div className="flex justify-center items-center">
//                 <p className="text-lg font-semibold text-gray-800">
//                   {property?.owner_name}
//                 </p>
//                 <p className="text-gray-600 text-md">
//                   ({property?.owner_role || "Property Owner"})
//                 </p>
//               </div>
//               <p className="flex items-center">
//                 <FaPhone className="mr-2" /> {/* React Icon */}
//                 {property.owner_contact}
//               </p>
//             </div>
//           </div>

//           {/* Conditionally Render Button Inside Owner Details Div */}
//           {isScrolled && (
//             <div className="mt-5">
//               <Button
//                 onClick={handleBooking}
//                 fullWidth
//                 variant="filled"
//                 size="lg"
//                 type="submit"
//               >
//                 Book Now
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Leaflet Map */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold text-gray-900">
//           Property Location
//         </h2>
//         <MapContainer
//           center={[property?.latitude, property?.longitude]}
//           zoom={13}
//           className="h-64 w-full mt-4 rounded-lg shadow-md z-10"
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[property?.latitude, property?.longitude]}>
//             <Popup>{property?.title}</Popup>
//           </Marker>
//         </MapContainer>
//       </div>

//       {/* Ratings & Reviews Section */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold text-gray-900">
//           Ratings & Reviews
//         </h2>

//         {/* Calculate and display average rating */}
//         {property?.ratings?.length > 0 ? (
//           <div className="flex items-center gap-2 mt-2">
//             <Rating
//               value={
//                 property.ratings.reduce((acc, r) => acc + r.rating, 0) /
//                 property.ratings.length
//               }
//               readOnly
//               size="lg"
//             />
//             <span className="text-xl font-semibold text-gray-900">
//               {(
//                 property.ratings.reduce((acc, r) => acc + r.rating, 0) /
//                 property.ratings.length
//               ).toFixed(1)}{" "}
//               ( {property.ratings.length}{" "}
//               {property.ratings.length === 1 ? "review" : "reviews"})
//             </span>
//           </div>
//         ) : (
//           <p className="text-gray-600 mt-2">No reviews yet.</p>
//         )}
//       </div>

//       {/* Display Individual Reviews */}
//       {property?.ratings?.length > 0
//         ? property.ratings.map((rating, index) => (
//             <div
//               key={index}
//               className="bg-white p-5 rounded-xl shadow-md border mt-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={`https://ui-avatars.com/api/?name=${rating.user_name}&background=random&color=fff`}
//                   alt="User Avatar"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold text-lg">
//                     {rating.user_name || "User"}
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     {moment(rating.date).format("MMMM YYYY")}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-3 flex items-center gap-2">
//                 <Rating value={rating.rating} readOnly size="md" />
//                 <span className="text-gray-700 font-semibold">
//                   {rating.rating}.0
//                 </span>
//               </div>
//               <p className="mt-3 text-gray-800 leading-relaxed">
//                 {rating.comment}
//               </p>
//             </div>
//           ))
//         : null}

//       {/* Floating Book Now Button (Visible When Not Scrolled) */}
//       {!isScrolled && (
//         <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
//           <Button
//             onClick={handleBooking}
//             fullWidth
//             variant="filled"
//             size="lg"
//             type="submit"
//           >
//             Book Now
//           </Button>
//         </div>
//       )}

//       {/* Rating Modal */}
//       <RatingModal
//         open={open}
//         setOpen={setOpen}
//         propertyId={id}
//         id={property?.id}
//       />

//       {/* Write a Review Button */}
//       <Button onClick={() => setOpen(true)} type="submit" mt="sm">
//         Write a Review
//       </Button>
//     </motion.div>
//   );
// };

// export default GetPropertyDetails;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import moment from "moment";
// import { motion } from "framer-motion";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import RatingModal from "./RatingModal";
// import { Button, Rating } from "@mantine/core";
// import { toast } from "react-hot-toast";
// import useBookingStore from "../stores/useBookingStore";
// import { jwtDecode } from "jwt-decode";
// import {
//   FaMoneyBillAlt,
//   FaRuler,
//   FaMapMarkerAlt,
//   FaRoad,
//   FaCompass,
//   FaCalendarAlt,
//   FaPhone,
//   FaEye,
//   FaBed,
//   FaBath,
//   FaStar,
// } from "react-icons/fa";
// import "leaflet/dist/leaflet.css";
// export const PropertiesViews = ({ id }) => {
//   const [totalViews, setTotalViews] = useState(0);

//   useEffect(() => {
//     const fetchViews = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost/rent-easy/public/update_views.php?propertyId=${id}`
//         );
//         if (response.data.success) {
//           setTotalViews(response.data.views);
//         }
//       } catch (error) {
//         console.error("Error fetching views:", error);
//       }
//     };

//     fetchViews();
//   }, [id]);

//   return (
//     <div className="flex items-center gap-2 text-gray-700">
//       <FaEye className="text-gray-500" />
//       <span>{totalViews} views</span>
//     </div>
//   );
// };

// const GetPropertyDetails = () => {
//   const { bookProperty } = useBookingStore();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
//         );

//         if (data.success && data.properties?.length) {
//           const fetchedProperty = data.properties[0];
//           setProperty({
//             ...fetchedProperty,
//             images: [...new Set(fetchedProperty.images || [])],
//           });
//           setSelectedImage(fetchedProperty.images?.[0] || "/default-image.jpg");
//         } else {
//           setError(data.message || "Property not found");
//         }
//       } catch {
//         setError("Error connecting to the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [id]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleBooking = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     if (property?.status === "booked") {
//       toast.error("This property is already booked.");
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken?.userId;
//       if (!userId) {
//         toast.error("Invalid token. Please log in again.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("property_id", id);
//       formData.append("user_id", userId);
//       formData.append("id", userId);
//       formData.append("status", "pending");

//       const response = await axios.post(
//         "http://localhost/rent-easy/public/bookProperty.php",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Booking response:", response.data);

//       if (response.data.success) {
//         bookProperty(property);
//         // Extract booking ID from response and update store
//         const bookingId = response.data.booking_id;
//         bookProperty({ ...property, bookingId });
//         toast.success("Property booked successfully!");
//         navigate("/profile?tab=third");
//       } else {
//         toast.error(response.data.message || "Booking failed.");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error("An error occurred while booking the property.");
//     }
//   };

//   if (loading) return <div className="text-center p-10">Loading...</div>;
//   if (error)
//     return <div className="text-center text-red-500 p-10">{error}</div>;

//   const avgRating =
//     property?.ratings?.length > 0
//       ? (
//           property.ratings.reduce((acc, r) => acc + r.rating, 0) /
//           property.ratings.length
//         ).toFixed(1)
//       : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="mx-auto p-4"
//     >
//       {/* Property Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">{property?.title}</h1>
//         <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
//           <div className="flex items-center">
//             <FaMapMarkerAlt className="mr-1" />
//             <span>
//               {property?.city}, {property?.country}
//             </span>
//           </div>
//           <PropertiesViews id={id} />
//           <div className="flex items-center">
//             <FaStar className="text-yellow-400 mr-1" />
//             <span>
//               {avgRating} ({property?.ratings?.length || 0} reviews)
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Column */}
//         <div className="lg:w-2/3">
//           {/* Image Gallery */}
//           <div className="mb-6">
//             <div className="rounded-xl overflow-hidden shadow-lg mb-4">
//               <img
//                 src={selectedImage}
//                 alt="Property"
//                 className="w-full h-96 object-cover"
//               />
//             </div>
//             <div className="flex gap-2 overflow-x-auto pb-4">
//               {property?.images
//                 ?.filter((img) => img)
//                 .map((img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                     onClick={() => setSelectedImage(img)}
//                   />
//                 ))}
//             </div>
//           </div>

//           {/* Description */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//             <h2 className="text-2xl font-semibold mb-4">Description</h2>
//             <p className="text-gray-700">{property?.description}</p>
//           </div>

//           {/* Features */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//             <h2 className="text-2xl font-semibold mb-4">Features</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <div className="flex items-center">
//                 <FaBed className="text-blue-500 mr-2" />
//                 <span>{property?.bedrooms || 0} Bedrooms</span>
//               </div>
//               <div className="flex items-center">
//                 <FaBath className="text-blue-500 mr-2" />
//                 <span>{property?.bathrooms || 0} Bathrooms</span>
//               </div>
//               <div className="flex items-center">
//                 <FaRuler className="text-blue-500 mr-2" />
//                 <span>{property?.dimension} </span>
//               </div>
//               <div className="flex items-center">
//                 <FaRoad className="text-blue-500 mr-2" />
//                 <span>{property?.road_type}</span>
//               </div>
//               <div className="flex items-center">
//                 <FaCompass className="text-blue-500 mr-2" />
//                 <span>{property?.property_face} facing</span>
//               </div>
//               <div className="flex items-center">
//                 <FaMoneyBillAlt className="text-blue-500 mr-2" />
//                 <span>Rs.{property?.price}</span>
//               </div>
//             </div>
//           </div>

//           {/* Location */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//             <h2 className="text-2xl font-semibold mb-4">Location</h2>
//             <div className="h-64 rounded-lg overflow-hidden">
//               <MapContainer
//                 center={[property?.latitude, property?.longitude]}
//                 zoom={15}
//                 style={{ height: "100%", width: "100%", zIndex: 10 }}
//               >
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker position={[property?.latitude, property?.longitude]}>
//                   <Popup>{property?.title}</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           </div>

//           {/* Reviews */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
//               <Button onClick={() => setOpen(true)} variant="outline">
//                 Write a Review
//               </Button>
//             </div>

//             {property?.ratings?.length > 0 ? (
//               <div className="space-y-4">
//                 {property.ratings.map((rating, index) => (
//                   <div key={index} className="border-b pb-4">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={`https://ui-avatars.com/api/?name=${rating.user_name}&background=random`}
//                         alt="User"
//                         className="w-12 h-12 rounded-full"
//                       />
//                       <div>
//                         <p className="font-semibold">
//                           {rating.user_name || "User"}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                           {moment(rating.date).format("MMMM YYYY")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-2 flex items-center gap-2">
//                       <Rating value={rating.rating} readOnly size="sm" />
//                       <span className="text-gray-700">{rating.rating}.0</span>
//                     </div>
//                     <p className="mt-2 text-gray-700">{rating.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No reviews yet.</p>
//             )}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="lg:w-1/3">
//           <div className="sticky top-4 space-y-6">
//             {/* Pricing Card */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-gray-600">Rent:</span>
//                 <span className="text-2xl font-bold text-blue-600">
//                   Rs.{property?.price}<span className="space-y-2 text-sm text-gray-500">/per month</span>
//                 </span>
//               </div>
//               <Button
//                 fullWidth
//                 size="lg"
//                 onClick={handleBooking}
//                 className="bg-blue-600 hover:bg-blue-700"
//                 disabled={property?.status === "booked"}
//               >
//                 {property?.status === "booked" ? "Already Booked" : "Book Now"}
//               </Button>
//             </div>

//             {/* Owner Info */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-2xl font-semibold mb-4">Contact Owner</h2>
//               <div className="flex items-center gap-4">
//                 <img
//                   src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&size=100`}
//                   alt="Owner"
//                   className="w-16 h-16 rounded-full"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{property?.owner_name}</h3>
//                   <p className="text-gray-600">{property?.owner_role}</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center">
//                 <FaPhone className="text-gray-500 mr-2" />
//                 <span>{property?.owner_contact}</span>
//               </div>
//               <Button
//                 fullWidth
//                 variant="outline"
//                 size="md"
//                 className="mt-4"
//                 onClick={() =>
//                   (window.location.href = `tel:${property?.owner_contact}`)
//                 }
//               >
//                 Call Owner
//               </Button>
//             </div>

//             {/* Quick Facts */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Property ID:</span>
//                   <span>{property?.id}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Posted:</span>
//                   <span>
//                     {moment(property?.uploaded_at).format("MMM D, YYYY")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span
//                     className={
//                       property?.status === "available"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }
//                   >
//                     {property?.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Booking Button */}
//       {!isScrolled && (
//         <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 lg:hidden">
//           <Button
//             onClick={handleBooking}
//             fullWidth
//             size="lg"
//             className="bg-blue-600 hover:bg-blue-700"
//             disabled={property?.status === "booked"}
//           >
//             {property?.status === "booked" ? "Already Booked" : "Book Now"}
//           </Button>
//         </div>
//       )}

//       <RatingModal
//         open={open}
//         setOpen={setOpen}
//         propertyId={id}
//         id={property?.id}
//       />
//     </motion.div>
//   );
// };

// export default GetPropertyDetails;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RatingModal from "./RatingModal";
import { Button, Rating } from "@mantine/core";
import { toast } from "react-hot-toast";
import useBookingStore from "../stores/useBookingStore";
import { jwtDecode } from "jwt-decode";
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
  FaPhone,
  FaEye,
  FaBed,
  FaBath,
  FaStar,
} from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { BiLogoWhatsappSquare } from "react-icons/bi";

export const PropertiesViews = ({ id }) => {
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await axios.get(
          `http://localhost/rent-easy/public/update_views.php?propertyId=${id}`
        );
        if (response.data.success) {
          setTotalViews(response.data.views);
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchViews();
  }, [id]);

  return (
    <div className="flex items-center gap-2 text-gray-700 display-inline">
    <FaEye className="text-gray-500" />
    <span>{totalViews} views</span>
  </div>
  );
};

const GetPropertyDetails = () => {
  const { bookProperty } = useBookingStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
        );

        if (data.success && data.properties?.length) {
          const fetchedProperty = data.properties[0];
          setProperty({
            ...fetchedProperty,
            images: [...new Set(fetchedProperty.images || [])],
          });
          setSelectedImage(fetchedProperty.images?.[0] || "/default-image.jpg");
        } else {
          setError(data.message || "Property not found");
        }
      } catch {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (property?.status === "booked") {
      toast.error("This property is already booked.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
      if (!userId) {
        toast.error("Invalid token. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("property_id", id);
      formData.append("user_id", userId);
      formData.append("id", userId);
      formData.append("status", "pending");

      const response = await axios.post(
        "http://localhost/rent-easy/public/bookProperty.php",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const bookingId = response.data.booking_id;
        bookProperty({ ...property, bookingId }); // Pass bookingId to Zustand store
        toast.success("Property booked successfully!");
        navigate("/profile?tab=third");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while booking the property.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  const avgRating =
    property?.ratings?.length > 0
      ? (
          property.ratings.reduce((acc, r) => acc + r.rating, 0) /
          property.ratings.length
        ).toFixed(1)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-4"
    >
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{property?.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>
              {property?.city}, {property?.country}
            </span>
          </div>
          <PropertiesViews id={id} />
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>
              {avgRating} ({property?.ratings?.length || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={selectedImage}
                alt="Property"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {property?.images
                ?.filter((img) => img)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{property?.description}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaBed className="text-blue-500 mr-2" />
                <span>{property?.bedrooms || 0} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath className="text-blue-500 mr-2" />
                <span>{property?.bathrooms || 0} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaRuler className="text-blue-500 mr-2" />
                <span>{property?.dimension} </span>
              </div>
              <div className="flex items-center">
                <FaRoad className="text-blue-500 mr-2" />
                <span>{property?.road_type}</span>
              </div>
              <div className="flex items-center">
                <FaCompass className="text-blue-500 mr-2" />
                <span>{property?.property_face} facing</span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillAlt className="text-blue-500 mr-2" />
                <span>Rs.{property?.price}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={[property?.latitude, property?.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: 10 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[property?.latitude, property?.longitude]}>
                  <Popup>{property?.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
              <Button onClick={() => setOpen(true)} variant="outline">
                Write a Review
              </Button>
            </div>

            {property?.ratings?.length > 0 ? (
              <div className="space-y-4">
                {property.ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${rating.user_name}&background=random`}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">
                          {rating.user_name || "User"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {moment(rating.date).format("MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Rating value={rating.rating} readOnly size="sm" />
                      <span className="text-gray-700">{rating.rating}.0</span>
                    </div>
                    <p className="mt-2 text-gray-700">{rating.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3">
          <div className="sticky top-4 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Rent:</span>
                <span className="text-2xl font-bold text-blue-600">
                  Rs.{property?.price}<span className="space-y-2 text-sm text-gray-500">/per month</span>
                </span>
              </div>
              <Button
                fullWidth
                size="lg"
                onClick={handleBooking}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={property?.status === "booked"}
              >
                {property?.status === "booked" ? "Already Booked" : "Book Now"}
              </Button>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Owner</h2>
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&size=100`}
                  alt="Owner"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{property?.owner_name}</h3>
                  <p className="text-gray-600">{property?.owner_role}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{property?.owner_contact}</span>
              </div>
              {/* <Button
                fullWidth
                variant="outline"
                size="md"
                className="mt-4"
                onClick={() =>
                  (window.location.href = `tel:${property?.owner_contact}`)
                }
              >
                Call Owner
              </Button> */}



<Button
  fullWidth
  variant="outline"
  size="md"
  className="mt-4"
  onClick={() => {
    // Ensure property?.owner_contact exists to avoid errors
    if (property?.owner_contact) {
      // Open WhatsApp link in a new tab
      window.open(`https://wa.me/${property.owner_contact}`, '_blank');
    }
  }}
>
                Call Owner
</Button>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID:</span>
                  <span>{property?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span>
                    {moment(property?.uploaded_at).format("MMM D, YYYY")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={
                      property?.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {property?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Button */}
      {!isScrolled && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 lg:hidden">
          <Button
            onClick={handleBooking}
            fullWidth
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={property?.status === "booked"}
          >
            {property?.status === "booked" ? "Already Booked" : "Book Now"}
          </Button>
        </div>
      )}

      <RatingModal
        open={open}
        setOpen={setOpen}
        propertyId={id}
        id={property?.id}
      />
    </motion.div>
  );
};

export default GetPropertyDetails;