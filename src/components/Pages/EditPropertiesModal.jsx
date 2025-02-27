import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Text,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditPropertiesModal = ({
  opened,
  onClose,
  property,
  propertyId,
  userId,
  onPropertyUpdated,
}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "",
    dimension: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update form data when `property` changes
  useEffect(() => {
    if (property) {
      setFormValues({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        city: property.city || "",
        country: property.country || "",
        dimension: property.dimension || "",
      });
      setErrorMessage("");
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error message
    setErrorMessage("");
    
    if (!propertyId) {
      toast.error("Property ID is missing");
      setErrorMessage("Property ID is missing");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    // Log the data being sent for debugging
    const data = {
      title: formValues.title,
      description: formValues.description,
      price: formValues.price,
      city: formValues.city,
      country: formValues.country,
      dimension: formValues.dimension,
      propertyId: propertyId,
      id: userId,
    };
    
    console.log("Sending data:", data);

    try {
      const response = await axios.put(
        "http://localhost/rent-easy/public/editPropertiesFromProfile.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        toast.success("Property updated successfully!");
        if (onPropertyUpdated) {
          onPropertyUpdated();
        }
        onClose();
      } else {
        const message = response.data.message || "Failed to update property";
        toast.error(message);
        setErrorMessage(message);
        
        // Log debug info if available
        if (response.data.debug) {
          console.log("Debug info:", response.data.debug);
        }
      }
    } catch (error) {
      console.error("Update error:", error);
      const message = error.response?.data?.message || "Failed to update property. Network error.";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      padding="xl"
    >
      <form onSubmit={handleSubmit}>
        <Title order={3} className="mb-6 text-center">
          Edit Property Details
        </Title>

        {errorMessage && (
          <Text color="red" size="sm" className="mb-4">
            Error: {errorMessage}
          </Text>
        )}

        <div className="mb-4">
          <Text size="sm" weight={500} className="mb-1">
            Property ID: {propertyId || "Not available"}
          </Text>
          <Text size="sm" weight={500} className="mb-4">
            User ID: {userId || "Not available"}
          </Text>
        </div>

        <Group grow className="mb-4">
          <TextInput
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Price"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </Group>

        <Textarea
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <Group grow className="mb-4">
          <TextInput
            label="City"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleChange}
            required
          />
        </Group>

        <TextInput
          label="Dimension (sqft)"
          name="dimension"
          value={formValues.dimension}
          onChange={handleChange}
          required
          className="mb-6"
        />

        <Button
          type="submit"
          fullWidth
          size="md"
          className="bg-teal-500 hover:bg-teal-600"
          loading={isSubmitting}
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditPropertiesModal;