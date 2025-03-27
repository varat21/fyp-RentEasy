import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Text,
  Loader,
  Select
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
  image

}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "",
    dimension: "",
    road_type: "",
    property_face: "",
    municipality: "",
    ward_no: "",
    province: "",
    type: "",
    latitude: "",
    longitude: "",
    
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
        road_type: property.road_type || "",
        property_face: property.property_face || "",
        municipality: property.municipality || "",
        ward_no: property.ward_no || "",
        province: property.province || "",
        type: property.type || "",
        latitude: property.latitude || "",
        longitude: property.longitude || "",
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

    // Prepare data for submission
    const data = {
      ...formValues,
      propertyId,
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
      const message =
        error.response?.data?.message || "Failed to update property. Network error.";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  console.log(image);

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg" padding="xl" className="mt-7">
      <form onSubmit={handleSubmit}>
        <Title order={3} className="mb-6 text-center ">
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
        <div className="flex justify-center items-center">
        <img 
  src={image || "https://via.placeholder.com/300"} 
  alt="Property" 
  className="w-36 h-36 rounded-full flex"
/>
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
            disabled
          />
          <TextInput
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleChange}
            required
            disabled
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Dimension (sqft)"
            name="dimension"
            value={formValues.dimension}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Road Type"
            name="road_type"
            value={formValues.road_type}
            onChange={handleChange}
            required
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Property Face"
            name="property_face"
            value={formValues.property_face}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Municipality"
            name="municipality"
            value={formValues.municipality}
            onChange={handleChange}
            required
            disabled
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Ward No"
            name="ward_no"
            value={formValues.ward_no}
            onChange={handleChange}
            required
            disabled
          />
          <TextInput
            label="Province"
            name="province"
            value={formValues.province}
            onChange={handleChange}
            required
            disabled
          />
        </Group>

        <Group grow className="mb-4">
        <Select
  label="Type"
  name="propertyType"
  placeholder="Select property type"
  data={["House", "Room", "ShopHouse", "Apartment"]}
  value={formValues.propertyType}
  onChange={(value) => setFormValues(prev => ({ ...prev, propertyType: value }))}
  required
/>

          <TextInput
            label="Latitude"
            name="latitude"
            value={formValues.latitude}
            onChange={handleChange}
            required
            disabled
          />
          <TextInput
            label="Longitude"
            name="longitude"
            value={formValues.longitude}
            onChange={handleChange}
            required
            disabled
          />
        </Group>
        {/* <div className="flex justify-center items-center">
        <img 
  src={image || "https://via.placeholder.com/300"} 
  alt="Property" 
  className="w-36 h-36 rounded-full flex"
/>
</div> */}

        <Button
          type="submit"
          fullWidth
          size="md"
          className="bg-teal-500 hover:bg-teal-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader size="sm" color="white" /> : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
};

export default EditPropertiesModal;

