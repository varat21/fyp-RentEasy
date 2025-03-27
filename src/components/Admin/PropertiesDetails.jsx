
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
} from "react-icons/fa";
import RatingModal from "../properties/RatingModal";
import { PropertiesViews } from "../properties/GetPropertiesDetails";

// // PropertiesViews Component
// export
// const PropertiesViews = ({ id }) => {
//   const [totalViews, setTotalViews] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost/rent-easy/public/update_views.php?propertyId=${id}`
//         );
//         console.log(response.data);
//         if (response.data.success) {
//           setTotalViews(response.data.views);
//         } else {
//           console.log(response.data.message);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [id]);
//   console.log(totalViews);

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center">
//       <div className="mb-2">
//         <FaEye className="text-2xl text-purple-500" />
//       </div>
//       <p className="text-lg font-semibold text-gray-800">Total Views </p>
//       <p className="text-gray-700 text-md mt-1">{totalViews}</p>
      
//     </div>
//   );
// };

// GetPropertyDetails Component
const PropertiesDetails = () => {
  const { bookedProperties, totalAmount, removeProperty, clearBookings } =
    useBookingStore();
  console.log("Booked Properties:", bookedProperties);
  const navigate = useNavigate();

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll behavior

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
        );
        console.log("API Response:", data); 

        if (data.success && data.properties?.length) {
          const fetchedProperty = data.properties[0];

          setProperty({
            ...fetchedProperty,
            images: [...new Set(fetchedProperty.images || [])], // Remove duplicate images
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
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

    // Check if the property is already booked
    if (property?.status === "booked") {
      toast.error("This property is already booked.");
      return;
    }

    try {
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId; // Adjust based on your token structure
      if (!userId) {
        toast.error("Invalid token. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("property_id", id);
      formData.append("user_id", userId); // Appending user ID from decoded token
      formData.append("id", userId);
      formData.append("status", "pending");

      const response = await axios.post(
        "http://localhost/rent-easy/public/bookProperty.php",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Booking response:", response.data); // 🔥 Log booking response

      if (response.data.success) {
        // Add the property to the booking store
        useBookingStore.getState().bookProperty(property);
        toast.success("Property booked successfully!");
        // Navigate to the Property.jsx component
        navigate("/properties");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while booking the property.");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-xl font-semibold text-gray-700">
        Loading property details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-10 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Property Banner */}
      <div className="w-full h-72 md:h-[450px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={selectedImage}
          alt="Property Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image Gallery */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {Array.isArray(property?.images) &&
          property.images
            .filter((img) => img)
            .map((img, index) => (
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
          <div className="flex items-center gap-10">

          <h1 className="text-4xl font-bold text-gray-900">
            {property?.title}
          </h1>
          <PropertiesViews id={id} />

          </div>
          <p className="text-gray-600 mt-3 text-lg">{property?.description}</p>

          {/* Property Details Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-6 mt-6 w-full">
              {/* Grid Items with Icons */}
              {[
                {
                  label: "Price",
                  value: ` ${property?.price}`,
                  icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
                },
                {
                  label: "Size",
                  value: `${property?.dimension} sqft`,
                  icon: <FaRuler className="text-2xl text-green-500" />,
                },
                {
                  label: "Location",
                  value: `${property?.city}, ${property?.country}`,
                  icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
                },
                {
                  label: "Road Type",
                  value: property?.road_type,
                  icon: <FaRoad className="text-2xl text-purple-500" />,
                },
                {
                  label: "Facing",
                  value: property?.property_face,
                  icon: <FaCompass className="text-2xl text-yellow-500" />,
                },
                {
                  label: "Posted on",
                  value: moment(property?.uploaded_at).format("MMM Do YYYY"),
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
                  <p className="text-gray-700 text-md mt-1">{detail.value}</p>
                </div>
              ))}
              {/* <PropertiesViews id={id} /> */}
            </div>
          </div>
        </div>

        {/* Right Column - Owner Info */}
        <div className="bg-white p-6 rounded-lg shadow-md fixed top-4 right-4 z-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            Owner Details
          </h2>

          {/* Owner Avatar */}
          <div className="flex items-center gap-4 mt-4">
            <img
              src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&color=fff&size=100`}
              alt="Owner Avatar"
              className="w-16 h-16 rounded-full shadow-md"
            />
            <div>
              <div className="flex justify-center items-center">
                <p className="text-lg font-semibold text-gray-800">
                  {property?.owner_name}
                </p>
                <p className="text-gray-600 text-md">
                  ({property?.owner_role || "Property Owner"})
                </p>
              </div>
              <p className="flex items-center">
                <FaPhone className="mr-2" /> {/* React Icon */}
                {property.owner_contact}
              </p>
            </div>
          </div>

          {/* Conditionally Render Button Inside Owner Details Div */}
          {/* {isScrolled && (
            <div className="mt-5">
              <Button
                onClick={handleBooking}
                fullWidth
                variant="filled"
                size="lg"
                type="submit"
              >
                Book Now
              </Button>
            </div>
          )} */}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Property Location
        </h2>
        <MapContainer
          center={[property?.latitude, property?.longitude]}
          zoom={13}
          className="h-64 w-full mt-4 rounded-lg shadow-md z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[property?.latitude, property?.longitude]}>
            <Popup>{property?.title}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Ratings & Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ratings & Reviews
        </h2>

        {/* Calculate and display average rating */}
        {property?.ratings?.length > 0 ? (
          <div className="flex items-center gap-2 mt-2">
            <Rating
              value={
                property.ratings.reduce((acc, r) => acc + r.rating, 0) /
                property.ratings.length
              }
              readOnly
              size="lg"
            />
            <span className="text-xl font-semibold text-gray-900">
              {(
                property.ratings.reduce((acc, r) => acc + r.rating, 0) /
                property.ratings.length
              ).toFixed(1)}{" "}
              ( {property.ratings.length}{" "}
              {property.ratings.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        ) : (
          <p className="text-gray-600 mt-2">No reviews yet.</p>
        )}
      </div>

      {/* Display Individual Reviews */}
      {property?.ratings?.length > 0
        ? property.ratings.map((rating, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md border mt-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${rating.user_name}&background=random&color=fff`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {rating.user_name || "User"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {moment(rating.date).format("MMMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Rating value={rating.rating} readOnly size="md" />
                <span className="text-gray-700 font-semibold">
                  {rating.rating}.0
                </span>
              </div>
              <p className="mt-3 text-gray-800 leading-relaxed">
                {rating.comment}
              </p>
            </div>
          ))
        : null}

      {/* Floating Book Now Button (Visible When Not Scrolled) */}
      {/* {!isScrolled && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <Button
            onClick={handleBooking}
            fullWidth
            variant="filled"
            size="lg"
            type="submit"
          >
            Book Now
          </Button>
        </div>
      )} */}

      {/* Rating Modal */}
      <RatingModal
        open={open}
        setOpen={setOpen}
        propertyId={id}
        id={property?.id}
      />

      {/* Write a Review Button */}
      <Button onClick={() => setOpen(true)} type="submit" mt="sm">
        Write a Review
      </Button>
    </motion.div>
  );
};

export default PropertiesDetails;
