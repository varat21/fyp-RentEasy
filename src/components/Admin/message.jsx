import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Text, Title, Loader } from '@mantine/core';
import { FaPhone, FaEnvelope, FaComment, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';

const Message = () => {
  // State to store contact messages
  const [contacts, setContacts] = useState([]);
  // State to handle loading
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Function to fetch contact messages from the API
  const fetchContacts = async () => {
    if (!token) {
      toast.error("Please Login First");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/AdminContact_us.php",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setContacts(response.data.data || []); // Set the contact messages
      } else {
        setError("No Contact Messages Found");
      }
    } catch (error) {
      setError("An error occurred while fetching contact messages");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch contacts when the component loads
  useEffect(() => {
    fetchContacts();
  }, []);

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="xl" />
      </div>
    );
  }

  // Show an error message if something went wrong
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 w-full">
      <h3 className="text-xl font-semibold mb-4 text-left">Contact Messages</h3>
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {contacts.map((contact) => (
            <Card key={contact.contactId} padding="lg" radius="md" withBorder className="bg-white shadow-lg">
              <div className="flex flex-col gap-4">
                {/* Name and Message Section */}
                <div className="flex flex-col gap-2">
                  <Title order={3}>{contact.name}</Title>
                  <div className="flex items-center gap-2">
                    <FaComment className="text-lg text-red-500" />
                    <Text className="text-gray-600">{contact.message}</Text>
                  </div>
                </div>

                {/* Other Details Section */}
                <div className="">
                  {/* Phone */}
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <FaPhone className="text-lg text-blue-500" />
                    <Text className="text-gray-600 text-sm">{contact.phoneNumber}</Text>
                  </div>
                  {/* Email */}
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <FaEnvelope className="text-lg text-green-500" />
                    <Text className="text-gray-600 text-sm">{contact.email}</Text>
                  </div>
                  {/* Date */}
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-lg text-purple-500" />
                    <Text className="text-gray-600 text-sm">
                      {moment(contact.created_at).fromNow()} {/* Use fromNow() for relative time */}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Text color="dimmed">No contact messages found.</Text>
      )}
    </div>
  );
};

export default Message;