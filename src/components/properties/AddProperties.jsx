import React, {useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  TextInput,
  Button,
  Group,
  Select,
  NumberInput,
  Text,
  rem,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

// Leaflet Marker Icon Configuration
const iconUrl = "./icon.png"; // Replace with your actual path to marker icon
const markerIcon = L.icon({
  iconUrl,
  iconSize: [35, 35],
});

const AddProperties = () => {
  // Placeholder values for map center (example: restaurant coordinates)
  const restaurant = {
    latitude: 28.26689,
    longitude: 83.96851,
  };
  const [marker, setMarker] = useState([restaurant.latitude, restaurant.longitude]);

// Function to handle map click events
const MapEventsHandler = () => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      setMarker([lat, lng]); // Update marker position
    },
  });
  return null;
};
  const handleDrop = (files) => {
    console.log("Accepted files:", files);
  };

  const handleReject = (files) => {
    console.log("Rejected files:", files);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center p-6">
      <div className=" rounded-xl shadow-sm p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Post Property
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Fill out the form below to add your property
        </p>

        <div className="mt-8 space-y-6">
          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput label="Title" name="title" placeholder="E.g., House For Rent at..." size="md" />
            <TextInput label="Category" name="category" placeholder="E.g., Residential" size="md" />
            <Select label="Type" name="type" placeholder="Select property type" data={['House', 'Room', 'ShopHouse', 'Apartment']} />
          </div>

          {/* Address Details */}
          <h2 className="text-lg font-semibold text-gray-700 text-center">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextInput label="Address" name="address" placeholder="Enter your address" size="md" />
            <TextInput label="City" name="city" placeholder="Search City..." size="md" />
            <Select label="Area" name="area" placeholder="Select area" data={['Area 1', 'Area 2', 'Area 3']} />
            <TextInput label="Municipality" name="municipality" placeholder="Enter Municipality" size="md" />
            <TextInput label="Ward No." name="wardNo" placeholder="Enter Ward No." size="md" />
            <TextInput label="Province" name="province" placeholder="Enter Province" size="md" />
          </div>

          {/* Map for Location */}
          <h2 className="text-lg font-semibold text-gray-700 text-center">Select Location on Map</h2>
          <div className="h-full w-full bg-gray-200 rounded-lg overflow-hidden">
            {/* <MapContainer center={[restaurant.latitude, restaurant.longitude]} zoom={16} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[restaurant.latitude, restaurant.longitude]} icon={markerIcon} />
            </MapContainer> */}


<MapContainer
              center={marker}
              zoom={13}
              className="h-[220px] z-50 rounded-lg overflow-hidden w-[100%]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={markerIcon} position={marker}></Marker>
              <MapEventsHandler />
            </MapContainer>
          </div>




</div>




            
          

          {/* Property Area & Road */}
          <h2 className="text-lg font-semibold text-gray-700 text-center mt-9">Property Area & Road</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
            <NumberInput label="Total Area (sq ft)" name="totalArea" size="md" />
            <NumberInput label="Built-Up Area (sq ft)" name="builtUpArea" size="md" />
            <TextInput label="Dimension" name="dimension" placeholder="E.g., 50x60 ft" size="md" />
            <TextInput label="Road Type" name="roadType" placeholder="E.g., Asphalt" size="md" />
            <TextInput label="Property Face" name="propertyFace" placeholder="E.g., North Facing" size="md" />
            <NumberInput label="Road Access (ft)" name="roadAccess" size="md" />
          </div>

          {/* Upload Files */}
          <h2 className="text-lg font-semibold text-gray-700 text-center mt-9">Add Photos</h2>
          <div className="mt-9">
            <Dropzone onDrop={handleDrop} onReject={handleReject} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400">
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>
                <div className="text-center">
                  <Text size="lg" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" className="text-gray-500" inline mt={7}>
                    Attach property pictures (Max: 5MB each)
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <h2 className="text-lg font-semibold text-gray-700 text-center mt-9">Add Property registerd document</h2>


            <Dropzone onDrop={handleDrop} onReject={handleReject} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 mt-9">
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>
                <div className="text-center">
                  <Text size="lg" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" className="text-gray-500" inline mt={7}>
                    Attach property government document (Max: 5MB each)
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>

          {/* Video URL */}
          <TextInput label="Video URL" name="videoUrl" placeholder="E.g., https://youtube.com/video" size="md" className="mt-9" />

          {/* Submit Button */}
          <Button color="blue" size="lg" fullWidth className="mt-4">
            Submit Property
          </Button>
        </div>
      </div>
      
 
  );
};

export default AddProperties;
