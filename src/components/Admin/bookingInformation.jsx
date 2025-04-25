import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Text, Title, Popover, Loader, Pagination } from '@mantine/core';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaUser, FaHome, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillAlt, FaCheckCircle, FaEye } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

const BookingInformation = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  const fetchBookings = async () => {
    if (!token) {
      toast.error("Please Login First");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/admin/bookingDetails.php",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setBookings(response.data.bookings || []);
      } else {
        setError(response.data.message || "No Bookings Found");
      }
    } catch (error) {
      setError("An error occurred while fetching booking information");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <motion.div className="flex justify-center items-center min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Loader size="xl" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="flex justify-center items-center min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div className="container mx-auto px-4 w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-semibold mb-4 text-left">Booking Information</h3>
      {bookings.length > 0 ? (
        <>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginatedBookings.map((booking, index) => (
              <motion.div
                key={booking.booking_id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card padding="lg" radius="md" withBorder className="border-gray-200">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <Text size="sm" color="dimmed">
                        Booking ID: {booking.booking_id}
                      </Text>
                     
                    </div>
                    <Title order={3} className="text-lg font-semibold truncate">
                      {booking.title || 'Unknown Property'}
                    </Title>
                    <Text size="sm" color="dimmed" className="line-clamp-2">
                      Booked by: {booking.name || 'Unknown User'}
                    </Text>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "User",
                          value: booking.name || 'N/A',
                          icon: <FaUser className="text-lg text-blue-500" />,
                        },
                        {
                          label: "Property Type",
                          value: booking.propertyType || 'N/A',
                          icon: <FaHome className="text-lg text-yellow-500" />,
                        },
                        {
                          label: "Location",
                          value: booking.city && booking.country ? `${booking.city}, ${booking.country}` : 'N/A',
                          icon: <FaMapMarkerAlt className="text-lg text-red-500" />,
                        },
                        {
                          label: "Price",
                          value: booking.price ? `$${booking.price}` : 'N/A',
                          icon: <FaMoneyBillAlt className="text-lg text-teal-500" />,
                        },
                        {
                          label: "Status",
                          value: booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'N/A',
                          icon: <FaCheckCircle className="text-lg text-green-500" />,
                        },
                        {
                          label: "Booking Date",
                          value: moment(booking.created_at).format("MMM Do YYYY"),
                          icon: <FaCalendarAlt className="text-lg text-pink-500" />,
                        },
                      ].map((detail, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-50 p-3 rounded-lg text-center flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="mb-2">{detail.icon}</div>
                          <p className="text-sm font-semibold text-gray-800">{detail.label}</p>
                          <p className="text-gray-600 text-sm mt-1">{detail.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              total={Math.ceil(bookings.length / itemsPerPage)}
              color="blue"
              className="flex items-center gap-2"
            />
          </div>
        </>
      ) : (
        <Text size="md" color="dimmed" className="text-center">
          No booking information found.
        </Text>
      )}
    </motion.div>
  );
};

export default BookingInformation;