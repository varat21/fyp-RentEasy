// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import { motion } from "framer-motion";
// import { Button, Select, TextInput, NumberInput } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";


// const Home = () => {
//   const Navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   // console.log(selectedType);
//   // Fetch properties from API
//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost/rent-easy/public/getProperties.php"
//       );
//       if (response.data.success) {
//         setProperties(response.data.properties);
//         setFilteredProperties(response.data.properties);
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

//   useEffect(() => {
//     // console.log(
//     //   "Available property types:",
//     //   properties.map((prop) => prop.type)
//     // );

//     fetchProperties();
//   }, []);

//   useEffect(() => {
//     let filtered = properties;

//     if (search) {
//       filtered = filtered.filter((property) =>
//         property.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (selectedCity && selectedCity !== "All Cities") {
//       filtered = filtered.filter((property) => property.city === selectedCity);
//     }

//     if (selectedType && selectedType !== "All Types") {
//       filtered = filtered.filter((property) => property.type === selectedType);
//     }

//     if (minPrice !== "" && maxPrice !== "") {
//       filtered = filtered.filter((property) => {
//         // Extract numeric value from price (remove Rs, $, and other symbols)
//         const price = parseFloat(property.price.replace(/[^\d.]/g, ""));
//         const min = parseFloat(minPrice);
//         const max = parseFloat(maxPrice);

//         return price >= min && price <= max;
//       });
//     }

//     setFilteredProperties(filtered);
//   }, [search, selectedCity, selectedType, minPrice, maxPrice, properties]);

//   if (loading) {
//     return (
//       <motion.div
//         className="flex justify-center items-center min-h-screen "
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col justify-center items-center">
//           <div className="text-lg">Loading properties...</div>
//           <div>
//             <Loader className="animate-spin" />
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div
//         className="flex justify-center items-center min-h-screen"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="text-red-500 text-lg">{error}</div>
//       </motion.div>
//     );
//   }
//   console.log(selectedType);
//   return (
//     <motion.div
//       className="container mx-auto px-4 w-full"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="relative w-full">
//         {/* Background Image */}
//         <div className="relative w-full h-72 md:h-[450px] overflow-hidden rounded-xl shadow-lg p-4">
//           <img
//             src="/images/bgImage.jpg"
//             alt="Property"
//             className="w-[100%] h-full object-cover rounded-lg shadow-lg"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
//         </div>

//         {/* Content Above the Image */}
//         <div className="absolute top-0 left-0 w-full p-12">
//           <motion.h1
//             className="text-4xl font-bold text-center mb-6 text-white drop-shadow-lg"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             Find Your Dream Property
//           </motion.h1>

//           {/* Filter Section */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 shadow-lg rounded-lg">
//             <TextInput
//               placeholder="Search by title"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full"
//             />
//             <Select
//               placeholder="Filter by city"
//               value={selectedCity}
//               onChange={setSelectedCity}
//               data={[
//                 "All Cities",
//                 ...new Set(properties.map((prop) => prop.city)),
//               ]}
//               className="w-full"
//             />
//             <Select
//               placeholder="Property Type"
//               value={selectedType}
//               onChange={setSelectedType}
//               data={[
//                 "All Types",
//                 ...new Set(properties.map((prop) => prop.type)),
//               ]}
//               className="w-full"
//             />
//             <div className="flex gap-2">
//               <NumberInput
//                 placeholder="Min Price"
//                 value={minPrice}
//                 onChange={setMinPrice}
//                 className="w-1/2"
//               />
//               <NumberInput
//                 placeholder="Max Price"
//                 value={maxPrice}
//                 onChange={setMaxPrice}
//                 className="w-1/2"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="p-16"></div>

//       <motion.h1
//         className="text-4xl font-bold text-center mb-6 text-black drop-shadow-lg p-7"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         Available Properties
//       </motion.h1>

//       {/* Property Listings */}
//       {filteredProperties.length === 0 ? (
//         <div className="text-lg text-center mt-8">No properties found</div>
//       ) : (
//         <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 cursor-pointer">
//           {filteredProperties.map((property, index) => (
//             <motion.div
//               key={property.propertyId}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               onClick={() => Navigate(`/property/${property.propertyId}`)}
//             >
//               <div className="relative h-48">
//                 <img
//                   src={
//                     property.images.length > 0
//                       ? property.images[0]
//                       : "https://via.placeholder.com/400x300?text=No+Image"
//                   }
//                   alt={property.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2 text-gray-800">
//                   {property.title}
//                 </h2>
//                 <h2 className="text-xl font-semibold mb-2 text-gray-800">
//                   {property.price}
//                 </h2>
//                 {property.description && (
//                   <p className="text-gray-600 mb-4 line-clamp-2">
//                     {property.description}
//                   </p>
//                 )}
//                 <div className="space-y-2 text-sm text-gray-500">
//                   {property.city && property.country && (
//                     <p className="flex items-center">
//                       <span className="mr-2">📍</span>
//                       {property.city}, {property.country}
//                     </p>
//                   )}
//                   {property.owner_name && (
//                     <p className="flex items-center">
//                       <span className="mr-2">👤</span>
//                       {property.owner_name}
//                     </p>
//                   )}
//                   {property.owner_contact && (
//                     <p className="flex items-center">
//                       <span className="mr-2">📞</span>
//                       {property.owner_contact}
//                     </p>
//                   )}
//                   <p className="flex items-center">
//                     <span className="mr-2">📅</span>
//                     {moment(property.uploaded_at).format("MMM Do YYYY")}
//                   </p>
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   {/* <Button color="blue" size="md" className="mt-6 w-full">
//                     Book Now
//                   </Button> */}
// <p className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:underline">
//   See more
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2}
//     stroke="currentColor"
//     className="w-4 h-4"
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//   </svg>
// </p>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import { Button, Select, TextInput, NumberInput, Pagination } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Home = () => {
  const Navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 6; // Number of items to show per page

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/getProperties.php"
      );
      console.log(response.data);
      if (response.data.success) {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      } else {
        setError(response.data.message || "Failed to fetch properties");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (search) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCity && selectedCity !== "All Cities") {
      filtered = filtered.filter((property) => property.city === selectedCity);
    }

    if (selectedType && selectedType !== "All Types") {
      filtered = filtered.filter((property) => property.type === selectedType);
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter((property) => {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ""));
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        return price >= min && price <= max;
      });
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [search, selectedCity, selectedType, minPrice, maxPrice, properties]);

  // Calculate the properties to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage; // Last item index
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // First item index
  const paginatedProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered properties array

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg">Loading properties...</div>
          <div>
            <Loader className="animate-spin" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative w-full h-72 md:h-[450px] overflow-hidden rounded-xl shadow-lg p-4">
          <img
            src="/images/bgImage.jpg"
            alt="Property"
            className="w-[100%] h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
        </div>
        

        {/* Content Above the Image */}
        <div className="absolute top-0 left-0 w-full p-12">
          <motion.h1
            className="text-4xl font-bold text-center mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Dream Property
          </motion.h1>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 shadow-lg rounded-lg">
            <TextInput
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <Select
              placeholder="Filter by city"
              value={selectedCity}
              onChange={setSelectedCity}
              data={[
                "All Cities",
                ...new Set(properties.map((prop) => prop.city)),
              ]}
              className="w-full"
            />
            <Select
              placeholder="Property Type"
              value={selectedType}
              onChange={setSelectedType}
              data={[
                "All Types",
                ...new Set(properties.map((prop) => prop.type)),
              ]}
              className="w-full"
            />
            <div className="flex gap-2">
              <NumberInput
                placeholder="Min Price"
                value={minPrice}
                onChange={setMinPrice}
                className="w-1/2"
              />
              <NumberInput
                placeholder="Max Price"
                value={maxPrice}
                onChange={setMaxPrice}
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-16"></div>

      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-black drop-shadow-lg p-7"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Available Properties
      </motion.h1>

      {/* Property Listings */}
      {paginatedProperties.length === 0 ? (
        <div className="text-lg text-center mt-8">No properties found</div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 cursor-pointer">
          {paginatedProperties.map((property, index) => (
            <motion.div
              key={property.propertyId}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => Navigate(`/property/${property.propertyId}`)}
            >
<div className="relative h-48">
  <img
    src={
      property.images.length > 0
        ? property.images[0]
        : "https://via.placeholder.com/400x300?text=No+Image"
    }
    alt={property.title}
    className="w-full h-full object-cover rounded-lg"
  />

  {property.status && (
    <div className="absolute top-2 right-2 bg-blue-500 text-white text-sm font-semibold px-3 py-0 rounded-full shadow-md">
      {property.status}
    </div>
  )}
</div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {property.title}
                </h2>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {property.price}
                </h2>
                {property.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {property.description}
                  </p>
                )}
                <div className="space-y-2 text-sm text-gray-500">
                  {property.city && property.country && (
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {property.city}, {property.country}
                    </p>
                  )}
                  {property.owner_name && (
                    <p className="flex items-center">
                      <span className="mr-2">👤</span>
                      {property.owner_name}
                    </p>
                  )}
                  {property.owner_contact && (
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      {property.owner_contact}
                    </p>
                  )}
                  <p className="flex items-center">
                    <span className="mr-2">📅</span>
                    {moment(property.uploaded_at).format("MMM Do YYYY")}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <p className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:underline">
                    See more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredProperties.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            page={currentPage} // Current page
            onChange={handlePageChange} // Function to handle page change
            total={Math.ceil(filteredProperties.length / itemsPerPage)} // Total number of pages
            color="blue"
            style={{ marginTop: "20px" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Home;
