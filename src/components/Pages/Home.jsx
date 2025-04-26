import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Button,
  Select,
  TextInput,
  NumberInput,
  Pagination,
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaFilter,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import moment from "moment";
import { PropertiesViews } from "../properties/GetPropertiesDetails";

const Home = () => {
  const navigate = useNavigate();

  // State variables
  const [properties, setProperties] = useState([]); 
  const [filteredProperties, setFilteredProperties] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 
  const [selectedType, setSelectedType] = useState(""); 
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState(""); 
  const [tempMinPrice, setTempMinPrice] = useState(""); 
  const [tempMaxPrice, setTempMaxPrice] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/getProperties.php"
      );
      console.log(response.data);
      if (response.data.success) {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties); // Set initial filtered properties
      } else {
        setError("Failed to fetch properties");
      }
    } catch (err) {
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties when the component loads
  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on search, city, type, and price range
  useEffect(() => {
    let filtered = properties;

    // Filter by search term
    if (search) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity && selectedCity !== "All Cities") {
      filtered = filtered.filter((property) => property.city === selectedCity);
    }

    // Filter by property type
    if (selectedType && selectedType !== "All Types") {
      filtered = filtered.filter(
        (property) =>
          property.propertyType.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Filter by price range (only if both values are set)
    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter((property) => {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ""));
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        return price >= min && price <= max;
      });
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to the first page
  }, [search, selectedCity, selectedType, properties, minPrice, maxPrice]);
  // Handle price search button click
  const handlePriceSearch = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedType("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredProperties(properties);
    setTempMinPrice("");
    setTempMaxPrice("");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader size="xl" />
      </motion.div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }


  return (
    <motion.div
      className="container mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Banner Section */}
      <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/images/bgImage.jpg"
          alt="Property"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Dream Property
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the best properties in your city
          </motion.p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center  gap-2">
            <FaFilter /> Filters
          </h2>
          <Button
            variant="outline"
            onClick={resetFilters}
            leftIcon={<FaTimes />}
            disabled={
              !search &&
              !selectedCity &&
              !selectedType &&
              !minPrice &&
              !maxPrice
            }
          >
            Clear Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TextInput
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Filter by city"
            value={selectedCity}
            onChange={setSelectedCity}
            data={[
              "All Cities",
              ...new Set(properties.map((prop) => prop.city)),
            ]}
          />

          <Select
            placeholder="Property Type"
            value={selectedType}
            onChange={setSelectedType}
            data={[
              "All Types",
              ...new Set(properties.map((prop) => prop.propertyType)),
            ]}
            withCheckIcon={false} // This removes the tick mark
            style={{ width: "100%" }}
          />

          <div className="flex gap-2 items-end">
            <NumberInput
              placeholder="Min Price"
              value={tempMinPrice}
              onChange={(value) => setTempMinPrice(value)}
              className="flex-1"
              icon={<span className="text-gray-500">Rs</span>}
            />
            <span className="text-gray-500 mx-1"></span>
            <NumberInput
              placeholder="Max Price"
              value={tempMaxPrice}
              onChange={(value) => setTempMaxPrice(value)}
              className="flex-1"
              icon={<span className="text-gray-500">$</span>}
            />
            <Button
              onClick={handlePriceSearch}
              leftIcon={<FaSearch />}
              className="h-[36px]"
              variant="filled"
              color="blue"
            >
              Apply Price
            </Button>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      {paginatedProperties.length === 0 ? (
        <div className="text-lg text-center mt-8">No properties found</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {paginatedProperties.map((property, index) => (

            <motion.div
              key={property.propertyId}
              className="bg-white rounded-lg  overflow-hidden cursor-pointer border  border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/property/${property.propertyId}`)}
            >
              
              <div className="relative h-48 border border-black-200 rounded-t-lg overflow-hidden ">
                <img
                  src={
                    property.images[0] ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.status && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {property.status}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-1 text-gray-800">
                    {property.title}
                  </h2>
                  <PropertiesViews id={property.propertyId} />
                </div>

                <h2 className="text-xl font-semibold mb-1">
                  Rs. {property.price}<span className="space-y-2 text-sm text-gray-500">/per month</span>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>
                    <FaMapMarkerAlt className="inline mr-2" />
                    {property.city}, {property.country}
                  </p>
                  <p>
                    <FaUser className="inline mr-2" />
                    {property.owner_name}
                  </p>
                  <p>
                    <FaPhone className="inline mr-2" />
                    {property.owner_contact}
                  </p>
                  <p>
                    <FaCalendarAlt className="inline mr-2" />
                    {moment(property.uploaded_at).format("MMM Do YYYY")}
                  </p>
                </div>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredProperties.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            page={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(filteredProperties.length / itemsPerPage)}
            color="blue"
          />
        </div>
      )}
    </motion.div>
  );
};

export default Home;
