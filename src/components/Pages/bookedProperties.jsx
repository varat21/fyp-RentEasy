import { useState, useEffect } from "react";
import { Badge, Button, Card } from "@mantine/core";
import { Trash } from "lucide-react";
import moment from "moment";
import { toast } from "react-hot-toast";

const BookedProperties = ({ id }) => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedProperties = async () => {
      try {
        if (!id) return;

        const response = await fetch(`http://localhost/rent-easy/public/bookingProperty.php?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setBookedProperties(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedProperties();
  }, [id]);

//   const removeProperty = (bookingId) => {
//     setBookedProperties((prev) => prev.filter((property) => property.booking_id !== bookingId));
//     toast.success("Booking cancelled successfully");
//   };

  if (loading) return <p className="text-gray-700">Loading booked properties...</p>;
  if (error) return <p className="text-red-500 font-medium">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Booked Properties</h3>
      {bookedProperties.length > 0 ? (
        <div className="grid gap-6">
          {bookedProperties.map((property) => (
            <Card key={property.booking_id} shadow="sm" padding="lg" className="bg-white rounded-lg">
              <div className="flex gap-6">
                <img
                  src={property.images?.[0] || "/default-property.jpg"}
                  alt={property.title}
                  className="w-40 h-32 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{property.title || "House For Rent"}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{property.description || "No description available."}</p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-semibold">Rs {property.price || "0"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-semibold">{property.location || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Size</p>
                      <p className="font-semibold">{property.size || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Uploaded On</p>
                      <p className="font-semibold">{moment(property.created_at).format("MMM DD, YYYY")}</p>
                    </div>
                  </div>
                  <Button
                    color="red"
                    className="mt-4 flex items-center gap-2"
                    // onClick={() => removeProperty(property.booking_id)}
                    size="sm"
                  >
                    <Trash size={16} /> Clear Booking
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No properties booked yet.</p>
      )}
    </div>
  );
};

export default BookedProperties;
