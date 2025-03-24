

// import React, { useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   Tooltip,
// } from "react-leaflet";
// import {
//   TextInput,
//   Button,
//   Group,
//   Select,
//   ActionIcon,
//   Text,
// } from "@mantine/core";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { IconUpload, IconPhoto, IconX, IconFile } from "@tabler/icons-react";
// import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
// import { Image } from "@mantine/core";
// import { useNavigate } from "react-router-dom";

// // Configure Leaflet marker icon
// const markerIcon = L.icon({
//   iconUrl: "./icon.png", 
//   iconSize: [35, 35],
// });

// const AddProperties = () => {
//   const Navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     type: "",
//     country: "",
//     city: "",
//     municipality: "",
//     ward_no: "",
//     province: "",
//     dimension: "",
//     road_type: "",
//     property_face: "",
//     description: "",
//     image: [],
//     document: "",
//   });

//   const [marker, setMarker] = useState([28.26689, 83.96851]);
//   const [images, setImages] = useState([]);
//   const [documents, setDocuments] = useState([]);

//   const handleImageDrop = (files) => {
//     const validFiles = files.filter((file) => {
//       if (file.size > 2000000) {
//         toast.error("File size should be less than 2MB");
//         return false;
//       }
//       return true;
//     });
//     setImages((prev) => [...prev, ...validFiles]);
//   };

//   const handleDocumentDrop = (files) => {
//     const validFiles = files.filter((file) => {
//       if (file.size > 2000000) {
//         toast.error("File size should be less than 2MB");
//         return false;
//       }
//       return true;
//     });
//     setDocuments((prev) => [...prev, ...validFiles]);
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const removeDocument = (index) => {
//     setDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Map event handler to update marker position
//   const MapEventsHandler = () => {
//     useMapEvents({
//       click: ({ latlng }) => setMarker([latlng.lat, latlng.lng]),
//     });
//     return null;
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in first!");
//       return;
//     }

//     const form = new FormData();
//     Object.keys(formData).forEach((key) => form.append(key, formData[key]));
//     form.append("latitude", marker[0]);
//     form.append("longitude", marker[1]);

//    // Append multiple images
//   images.forEach((image, index) => {
//     form.append(`images[${index}]`, image);
//   });

//   // Append multiple documents
//   documents.forEach((document, index) => {
//     form.append(`documents[${index}]`, document);
//   });

//     try {
//       const response = await axios.post(
//         "http://localhost/rent-easy/public/AddProperties.php",
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message || "Property added successfully!");
//         Navigate("/");
//         // Optionally reset form after successful submission
//         setFormData({
//           title: "",
//           price: "",
//           type: "",
//           country: "",
//           city: "",
//           municipality: "",
//           ward_no: "",
//           province: "",
//           dimension: "",
//           road_type: "",
//           property_face: "",
//           description: "",
//           image: [],
//           document: [],
//         });
//         setImages([]);
//         setDocuments([]);
//       } else {
//         toast.error(response.data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to submit the property. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center p-6">
//       <Toaster
//         toastOptions={{
//           style: {
//             zIndex: 10000, // Ensures the toast appears above everything else
//           },
//         }}
//       />
//       <div className="rounded-xl shadow-lg p-8 w-full max-w-5xl bg-white">
//         <h1 className="text-3xl font-bold text-gray-800 text-center">
//           Post Property
//         </h1>
//         <p className="text-gray-600 text-center mt-2">
//           Fill out the form below to add your property listing.
//         </p>
//         <form onSubmit={handleSubmit} enctype="multipart/form-data">
//           <div className="mt-8 space-y-6">
//             {/* Property Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <TextInput
//                 label="Title"
//                 name="title"
//                 placeholder="E.g., House for Rent"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//               />
//               <TextInput
//                 label="Rent Price"
//                 name="price"
//                 placeholder="E.g., Rs 1000"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="number"
//               />
//               <Select
//                 label="Type"
//                 name="type"
//                 placeholder="Select property type"
//                 data={["House", "Room", "ShopHouse", "Apartment",'Flat']}
//                 value={formData.type}
//                 onChange={(value) =>
//                   setFormData((prev) => ({ ...prev, type: value }))
//                 }
//               />
//             </div>

//             {/* Address Details */}
//             <h2 className="text-lg font-semibold text-gray-700">
//               Address Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <TextInput
//                 label="Country"
//                 name="country"
//                 placeholder="Enter your country"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//               />
//               <TextInput
//                 label="City"
//                 name="city"
//                 placeholder="Enter your city"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//               />
//               <TextInput
//                 label="Municipality"
//                 name="municipality"
//                 placeholder="Enter municipality"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//               />
//               <TextInput
//                 label="Ward No."
//                 name="ward_no"
//                 placeholder="Enter ward number"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="number"
//               />
//               <TextInput
//                 label="Province"
//                 name="province"
//                 placeholder="Enter province"
//                 size="md"
//                 onChange={handleInputChange}
//                 required

//               />
//             </div>

//             {/* Property Description */}
//             <h2 className="text-lg font-semibold text-gray-700">
//               Property Description
//             </h2>
//             <textarea
//               className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               rows="5"
//               placeholder="Describe the property details..."
//               name="description"
//               type="text"
//               onChange={handleInputChange}
//               required

//             ></textarea>

//             {/* Map Section */}
//             <h2 className="text-lg font-semibold text-gray-700">
//               Select Location on Map
//             </h2>
//             <div className="h-[220px] bg-gray-200 rounded-lg">
//               <MapContainer
//                 center={marker}
//                 zoom={13}
//                 className="h-full rounded-lg z-10"
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker icon={markerIcon} position={marker}></Marker>
//                 <MapEventsHandler />
//               </MapContainer>
//             </div>

//             {/* Property Features */}
//             <h2 className="text-lg font-semibold text-gray-700 mt-9">
//               Property Features
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* <div className="flex items-center gap-4"> 
//                  <TextInput
//                 label="Dimension"
//                 name="dimension"
//                 placeholder="Width"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//               />
//                 <TextInput
//                 label="Dimension"
//                 name="dimension"
//                 placeholder="length"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//               />
//               </div> */}
//               <TextInput
//                 label="Total Area"
//                 name="dimension"
//                 placeholder="E.g., 50 ft"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//               /> 
//               <TextInput
//                 label="Road Type"
//                 name="road_type"
//                 placeholder="E.g., Asphalt"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"

//               />
//               <TextInput
//                 label="Property Face"
//                 name="property_face"
//                 placeholder="E.g., North Facing"
//                 size="md"
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//               />
//             </div>

//             {/* File Upload Section */}
//             <h2 className="text-lg font-semibold text-gray-700 mt-9">
//               Upload Files
//             </h2>

//             {/* Image Upload */}
//             <div className="mt-4">
//               <label className="font-semibold text-gray-700">
//                 Property Pictures
//               </label>
//               <Dropzone
//                 multiple
//                 onDrop={handleImageDrop}
//                 accept={IMAGE_MIME_TYPE}
//                 className="mt-2 border rounded-md p-4"
//               >
//                 <Group position="center" spacing="xl">
//                   <IconPhoto size={32} />
//                   <Text>Drag images here or click to select</Text>
//                 </Group>
//               </Dropzone>

//               {/* Uploaded Image Previews */}
//               <div className="mt-6 grid grid-cols-4 gap-4 ">
//                 {images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <Image
//                       src={URL.createObjectURL(image)}
//                       alt={`Image-${index}`}
//                     />
//                     <ActionIcon
//                       onClick={() => removeImage(index)}
//                       className="absolute top-0 right-0 text-red-600"
//                     >
//                       <IconX size={16} />
//                     </ActionIcon>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Document Upload */}
//             <div className="mt-4">
//               <label className="font-semibold text-gray-700">
//                 Property Documents and Images
//               </label>
//               <Dropzone
//                 multiple
//                 onDrop={handleDocumentDrop}
//                 accept={[
//                   ...IMAGE_MIME_TYPE, // Include all image MIME types
//                   "application/pdf", // PDF files
//                   "application/msword", // DOC files
//                   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
//                 ]}
//                 className="mt-2 border rounded-md p-4"
//               >
//                 <Group position="center" spacing="xl">
//                   <IconFile size={32} />
//                   <Text>Drag documents or images here or click to select</Text>
//                 </Group>
//               </Dropzone>

//               {/* Uploaded Document and Image Previews */}
//               <div className="mt-6 grid grid-cols-4 gap-4">
//                 {documents.map((document, index) => (
//                   <div key={index} className="relative">
//                     {document.type.startsWith("image/") ? (
//                       // Display image preview
//                       <Image
//                         src={URL.createObjectURL(document)}
//                         alt={`Document-${index}`}
//                       />
//                     ) : (
//                       // Display document icon and name
//                       <Tooltip label={document.name} withArrow>
//                         <div className="p-2 bg-gray-100 rounded-md flex items-center space-x-2">
//                           <IconFile size={32} />
//                           <Text>{document.name}</Text>
//                         </div>
//                       </Tooltip>
//                     )}
//                     <ActionIcon
//                       onClick={() => removeDocument(index)}
//                       className="absolute top-0 right-0 text-red-600"
//                     >
//                       <IconX size={16} />
//                     </ActionIcon>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button
//               color="blue"
//               size="md"
//               className="mt-6 w-full"
//               // onClick={handleSubmit}
//               type="submit"
//             >
//               Submit Property
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AddProperties;


import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import {
  TextInput,
  Button,
  Group,
  Select,
  ActionIcon,
  Text,
} from "@mantine/core";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { IconUpload, IconPhoto, IconX, IconFile } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

// Configure Leaflet marker icon
const markerIcon = L.icon({
  iconUrl: "./icon.png",
  iconSize: [35, 35],
});

const AddProperties = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [marker, setMarker] = useState([28.26689, 83.96851]);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleImageDrop = (files) => {
    const validFiles = files.filter((file) => {
      if (file.size > 2000000) {
        toast.error("File size should be less than 2MB");
        return false;
      }
      return true;
    });
    setImages((prev) => [...prev, ...validFiles]);
    clearErrors("images"); // Clear the error if images are uploaded
  };

  const handleDocumentDrop = (files) => {
    const validFiles = files.filter((file) => {
      if (file.size > 2000000) {
        toast.error("File size should be less than 2MB");
        return false;
      }
      return true;
    });
    setDocuments((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (images.length === 1) {
      setError("images", {
        type: "required",
        message: "At least one image is required",
      });
    }
  };

  const removeDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const MapEventsHandler = () => {
    useMapEvents({
      click: ({ latlng }) => setMarker([latlng.lat, latlng.lng]),
    });
    return null;
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setError("images", {
        type: "required",
        message: "At least one image is required",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first!");
      return;
    }

    const form = new FormData();
    Object.keys(data).forEach((key) => form.append(key, data[key]));
    form.append("latitude", marker[0]);
    form.append("longitude", marker[1]);

    images.forEach((image, index) => {
      form.append(`images[${index}]`, image);
    });

    documents.forEach((document, index) => {
      form.append(`documents[${index}]`, document);
    });

    try {
      const response = await axios.post(
        "http://localhost/rent-easy/public/AddProperties.php",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Property added successfully!");
        navigate("/");
        setImages([]);
        setDocuments([]);
      } else {
        toast.error(response.data.message || "Please Login!");
      }
      navigate("/"); 

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit the property. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Toaster
        toastOptions={{
          style: {
            zIndex: 10000,
          },
        }}
      />
      <div className="rounded-xl shadow-lg p-8 w-full max-w-5xl bg-white">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Post Property
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Fill out the form below to add your property listing.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mt-8 space-y-6">
            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Title"
                    placeholder="E.g., House for Rent"
                    size="md"
                    error={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Rent Price"
                    placeholder="E.g., 1000"
                    size="md"
                    type="number"
                    error={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                defaultValue=""
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Type"
                    placeholder="Select property type"
                    data={["House", "Room", "ShopHouse", "Apartment"]}
                    error={errors.type?.message}
                  />
                )}
              />
            </div>

            {/* Address Details */}
            <h2 className="text-lg font-semibold text-gray-700">
              Address Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Country"
                    placeholder="Enter your country"
                    size="md"
                    error={errors.country?.message}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="City"
                    placeholder="Enter your city"
                    size="md"
                    error={errors.city?.message}
                  />
                )}
              />
              <Controller
                name="municipality"
                control={control}
                defaultValue=""
                rules={{ required: "Municipality is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Municipality"
                    placeholder="Enter municipality"
                    size="md"
                    error={errors.municipality?.message}
                  />
                )}
              />
              <Controller
                name="ward_no"
                control={control}
                defaultValue=""
                rules={{ required: "Ward number is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Ward No."
                    placeholder="Enter ward number"
                    size="md"
                    type="number"
                    error={errors.ward_no?.message}
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                defaultValue=""
                rules={{ required: "Province is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Province"
                    placeholder="Enter province"
                    size="md"
                    error={errors.province?.message}
                  />
                )}
              />
            </div>

            {/* Property Description */}
            <h2 className="text-lg font-semibold text-gray-700">
              Property Description
            </h2>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="5"
                  placeholder="Describe the property details..."
                  error={errors.description?.message}
                />
              )}
            />

            {/* Map Section */}
            <h2 className="text-lg font-semibold text-gray-700">
              Select Location on Map
            </h2>
            <div className="h-[220px] bg-gray-200 rounded-lg">
              <MapContainer
                center={marker}
                zoom={13}
                className="h-full rounded-lg z-10"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={markerIcon} position={marker}></Marker>
                <MapEventsHandler />
              </MapContainer>
            </div>

            {/* Property Features */}
            <h2 className="text-lg font-semibold text-gray-700 mt-9">
              Property Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Controller
                name="dimension"
                control={control}
                defaultValue=""
                rules={{ required: "Dimension is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Total Area"
                    placeholder="E.g., 50 ft"
                    size="md"
                    error={errors.dimension?.message}
                  />
                )}
              />
              <Controller
                name="road_type"
                control={control}
                defaultValue=""
                rules={{ required: "Road type is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Road Type"
                    placeholder="E.g., Asphalt"
                    size="md"
                    error={errors.road_type?.message}
                  />
                )}
              />
              <Controller
                name="property_face"
                control={control}
                defaultValue=""
                rules={{ required: "Property face is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Property Face"
                    placeholder="E.g., North Facing"
                    size="md"
                    error={errors.property_face?.message}
                  />
                )}
              />
            </div>

            {/* File Upload Section */}
            <h2 className="text-lg font-semibold text-gray-700 mt-9">
              Upload Files
            </h2>

            {/* Image Upload */}
            <div className="mt-4">
              <label className="font-semibold text-gray-700">
                Property Pictures
              </label>
              <Dropzone
                multiple
                onDrop={handleImageDrop}
                accept={IMAGE_MIME_TYPE}
                className="mt-2 border rounded-md p-4"
              >
                <Group position="center" spacing="xl">
                  <IconPhoto size={32} />
                  <Text>Drag images here or click to select</Text>
                </Group>
              </Dropzone>
              {errors.images && (
                <Text color="red" size="sm" className="mt-1">
                  {errors.images.message}
                </Text>
              )}

              {/* Uploaded Image Previews */}
              <div className="mt-6 grid grid-cols-4 gap-4 ">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Image-${index}`}
                    />
                    <ActionIcon
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 text-red-600"
                    >
                      <IconX size={16} />
                    </ActionIcon>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Upload */}
            <div className="mt-4">
              <label className="font-semibold text-gray-700">
                Property Documents and Images
              </label>
              <Dropzone
                multiple
                onDrop={handleDocumentDrop}
                accept={[
                  ...IMAGE_MIME_TYPE,
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
                className="mt-2 border rounded-md p-4"
              >
                <Group position="center" spacing="xl">
                  <IconFile size={32} />
                  <Text>Drag documents or images here or click to select</Text>
                </Group>
              </Dropzone>

              {/* Uploaded Document and Image Previews */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                {documents.map((document, index) => (
                  <div key={index} className="relative">
                    {document.type.startsWith("image/") ? (
                      <Image
                        src={URL.createObjectURL(document)}
                        alt={`Document-${index}`}
                      />
                    ) : (
                      <Tooltip label={document.name} withArrow>
                        <div className="p-2 bg-gray-100 rounded-md flex items-center space-x-2">
                          <IconFile size={32} />
                          <Text>{document.name}</Text>
                        </div>
                      </Tooltip>
                    )}
                    <ActionIcon
                      onClick={() => removeDocument(index)}
                      className="absolute top-0 right-0 text-red-600"
                    >
                      <IconX size={16} />
                    </ActionIcon>
                  </div>
                ))}
              </div>
            </div>

            <Button
              color="blue"
              size="md"
              className="mt-6 w-full"
              type="submit"
            >
              Submit Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;