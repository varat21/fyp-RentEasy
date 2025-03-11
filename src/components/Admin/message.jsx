import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Group, Text, Title } from '@mantine/core';
import { FaUser, FaPhone, FaEnvelope, FaComment, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';

const Message = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

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
      console.log(response.data);

      if (response.data && response.data.success) {
        setContacts(response.data.data || []);
      } else {
        setError("No Contact Messages Found");
      }
    } catch (error) {
      setError("An error occurred while fetching contact messages");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mb-8 w-auto">
      <h3 className="text-xl font-semibold mb-4 text-left">Contact Messages</h3>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Card key={contact.contactId} shadow="sm" padding="lg" radius="md" withBorder className="mb-4">
            <div className="flex flex-col gap-4">
              <Group>
                <Title order={3}>{contact.name}</Title>
              </Group>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Phone",
                    value: contact.phoneNumber,
                    icon: <FaPhone className="text-2xl text-blue-500" />,
                  },
                  {
                    label: "Email",
                    value: contact.email,
                    icon: <FaEnvelope className="text-2xl text-green-500" />,
                  },
                  {
                    label: "Message",
                    value: contact.message,
                    icon: <FaComment className="text-2xl text-red-500" />,
                  },
                  {
                    label: "Date",
                    value: moment(contact.created_at).format("MMM Do YYYY, h:mm a"),
                    icon: <FaCalendarAlt className="text-2xl text-purple-500" />,
                  },
                ].map((detail, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center"
                  >
                    <div className="mb-2">{detail.icon}</div>
                    <p className="text-lg font-semibold text-gray-800">{detail.label}</p>
                    <p className="text-gray-700 text-md mt-1">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Text color="dimmed">No contact messages found.</Text>
      )}
    </div>
  );
};

export default Message;