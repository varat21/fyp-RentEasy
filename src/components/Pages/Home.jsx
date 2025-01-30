import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Memoize the fetch function to prevent recreating it on every render
  const fetchProperties = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost/rent-easy/public/getProperties.php");
      if (response.data.success) {
        setProperties(response.data.properties);
      } else {
        setError(response.data.message || "Failed to fetch properties");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Use useEffect with the memoized fetch function
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleImageError = (e) => {
    // e.target.onerror = null; // Prevent infinite loop of error handling
    // e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">No properties found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.propertyId}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {property.title}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;