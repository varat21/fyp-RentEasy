import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const GetPropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
        );

        if (response.data.success && Array.isArray(response.data.properties)) {
          setProperty(response.data.properties[0]);
          setSelectedImage(response.data.properties[0]?.images?.[0] || "/default-image.jpg");
        } else {
          setError(response.data.message || "Property not found");
        }
      } catch (err) {
        setError("Error connecting to the server");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10 text-xl font-semibold text-gray-700">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10 text-lg font-medium">{error}</div>;
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Property Banner */}
      <div className="w-full h-72 md:h-[450px] overflow-hidden rounded-xl shadow-lg">
        <img src={selectedImage} alt="Property Banner" className="w-full h-full object-cover" />
      </div>

      {/* Image Gallery */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {Array.isArray(property?.images) &&
          property.images.filter((img) => img).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property Image ${index + 1}`}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition duration-300"
              onClick={() => setSelectedImage(img)}
            />
          ))}
      </div>

      {/* Property Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Property Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900">{property?.title}</h1>
          <p className="text-gray-600 mt-3 text-lg">{property?.description}</p>

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {[
              { label: "Price", value: `Rs. ${property?.price}` },
              { label: "Size", value: `${property?.dimension} sqft` },
              { label: "Location", value: `${property?.city}, ${property?.country}` },
              { label: "Road Type", value: property?.road_type },
              { label: "Facing", value: property?.property_face },
              { label: "Posted on", value: moment(property?.uploaded_at).format("MMM Do YYYY") },
            ].map((detail, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold text-gray-800">{detail.label}</p>
                <p className="text-gray-700 text-md mt-1">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Owner Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900">Owner Details</h2>

          {/* Owner Avatar */}
          <div className="flex items-center gap-4 mt-4">
            <img
              src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&color=fff&size=100`}
              alt="Owner Avatar"
              className="w-16 h-16 rounded-full shadow-md"
            />
            <div>
              <div className="flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-800">{property?.owner_name}</p>
              <p className="text-gray-600 text-md">({property?.owner_role || "Property Owner"})</p>
              </div>
              <p className="text-gray-600 text-md">📞{property?.owner_contact}
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="mt-5 space-y-3">
           
          </div>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">Property Location</h2>
        <MapContainer
          center={[property?.latitude, property?.longitude]}
          zoom={13}
          className="h-64 w-full mt-4 rounded-lg shadow-md"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[property?.latitude, property?.longitude]}>
            <Popup>{property?.title}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Floating Book Now Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white text-lg font-bold py-4 rounded-full shadow-lg transition duration-300">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default GetPropertyDetails;
