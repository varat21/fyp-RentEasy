// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import { motion } from "framer-motion";
// import { Button } from "@mantine/core";
// const Rooms = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("http://localhost/rent-easy/public/Properties/rooms.php");
//       if (response.data.success) {
//         setProperties(response.data.properties);
//       } else {
//         setError(response.data.message || "Failed to fetch properties");
//       }
//     } catch (err) {
//       setError("Error connecting to the server");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//     useEffect(() => {
//       fetchProperties();
//     }, []);
    
//     if(loading){
//       return(
//        < motion.div
//         className="flex justify-center items-center min-h-screen"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         >
//           <div className="text-lg">Loading properties...</div>
//           </motion.div>
//       )
//     }
//     if(error){
//       return(
//         <motion.div
//         className="flex justify-center items-center min-h-screen"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         >
//           <div className="text-red-500 text-lg">{error}</div>
//           </motion.div>
//       )
//     }
//    if (!properties.length) {
//       return (
//         <motion.div
//           className="flex justify-center items-center min-h-screen"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="text-lg">No Rooms found</div>
//         </motion.div>
//       );
//     }
//    return (
//      <motion.div
//        className="container mx-auto px-4 py-8"
//        initial={{ opacity: 0, y: 20 }}
//        animate={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.5 }}
//      >
//        <motion.h1
//          className="text-3xl font-bold mb-8 text-center"
//          initial={{ opacity: 0, scale: 0.8 }}
//          animate={{ opacity: 1, scale: 1 }}
//          transition={{ duration: 0.5 }}
//        >
//          Available Properties
//        </motion.h1>
 
//        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//        {properties.map((property, index) => (
//            <motion.div
//              key={property.propertyId}
//              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform"
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.3, delay: index * 0.1 }}
//              whileHover={{ scale: 1.05 }}
//            >
//              <div className="relative h-48">
//                <img
//                  src={property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/400x300?text=No+Image"}
//                  alt={property.title}
//                  className="w-full h-full object-cover"
//                />
//              </div>
//              <div className="p-4">
//                <h2 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h2>
//                <h2 className="text-xl font-semibold mb-2 text-gray-800">{property.price}</h2>
 
//                {property.description && (
//                  <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
//                )}
 
//                <div className="space-y-2 text-sm text-gray-500">
//                  {property.city && property.country && (
//                    <p className="flex items-center">
//                      <span className="mr-2">📍</span>
//                      {property.city}, {property.country}
//                    </p>
//                  )}
//                  {property.owner_name && (
//                    <p className="flex items-center">
//                      <span className="mr-2">👤</span>
//                      {property.owner_name}
//                    </p>
//                  )}
//                  {property.owner_contact && (
//                    <p className="flex items-center">
//                      <span className="mr-2">📞</span>
//                      {property.owner_contact}
//                    </p>
//                  )}
//                  <p className="flex items-center">
//                    <span className="mr-2">📅</span>
//                    {moment(property.uploaded_at).format("MMM Do YYYY")}
//                  </p>
//                </div>
 
//                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                  <Button color="blue" size="md" className="mt-6 w-full">
//                    Book Now
//                  </Button>
//                </motion.div>
//              </div>
//            </motion.div>
//          ))}
//        </motion.div>
//      </motion.div>
//    );
//  };

// export default Rooms