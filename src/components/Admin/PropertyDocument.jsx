import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Group, Title, Text } from "@mantine/core";
import { FaFile, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { motion } from "framer-motion";

const PropertyDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/PropertyDocument.php"
      );
      if (response.data.success) {
        setDocuments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </motion.div>
    );
  }

  if (!documents.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <p className="text-lg font-semibold text-red-500">No documents found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-6 min-h-screen"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-gray-800 text-center mb-8"
      >
        Property Documents
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        <motion.h3
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-xl font-semibold mb-4 text-gray-700"
        >
          Uploaded Documents
        </motion.h3>

        {documents.map((doc, index) => (
          <motion.div
            key={doc.documentId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="mb-6 bg-white hover:shadow-md transition-shadow"
              component={motion.div}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <motion.div 
                  className="w-full md:w-44"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={doc.document}
                    alt={`Document ${doc.documentId}`}
                    className="w-full h-44 rounded-lg object-cover"
                  />
                </motion.div>

                <div className="flex-1">
                  <Group>
                    <Title order={3} className="text-gray-800">
                      Document ID: {doc.documentId}
                    </Title>
                  </Group>
                  <Text color="dimmed" className="mt-2">
                    Property ID: {doc.propertyId}
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <motion.div
                      className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <FaFile className="text-2xl text-blue-500" />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">Document</p>
                        <p className="text-gray-700 text-md">
                          {doc.document.split('/').pop()}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <FaCalendarAlt className="text-2xl text-green-500" />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">Uploaded At</p>
                        <p className="text-gray-700 text-md">
                          {moment(doc.uploaded_at).format("MMM Do YYYY")}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PropertyDocument;