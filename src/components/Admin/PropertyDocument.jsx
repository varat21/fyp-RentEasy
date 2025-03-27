import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Group, Title, Text } from "@mantine/core";
import { FaFile, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";

const PropertyDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/PropertyDocument.php"
      );
      if (response.data.success) {
        setDocuments(response.data.data); // Set the documents array
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">No documents found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Property Documents
      </h1>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Uploaded Documents
        </h3>
        {documents.map((doc) => (
          <Card
            key={doc.documentId}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="mb-6 bg-white"
          >
             <div className="w-full">
  <img
    src={doc.document}
    alt={`Document ${doc.documentId}`}
    className="w-full rounded-lg" 
    style={{ maxHeight: "100%", maxWidth: "100%" }} // Ensure the image fits within its container
  />
</div>
              <div className="flex flex-col md:flex-row gap-6">

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
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                    <FaFile className="text-2xl text-blue-500" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Document</p>
                      <p className="text-gray-700 text-md">
                        {doc.document.split('/').pop()} {/* Display only the file name */}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                    <FaCalendarAlt className="text-2xl text-green-500" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Uploaded At</p>
                      <p className="text-gray-700 text-md">
                        {moment(doc.uploaded_at).format("MMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyDocument;