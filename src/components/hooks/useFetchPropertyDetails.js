// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const usePropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
//         );
//         console.log(response.data);
        
//         if (response.data.success && Array.isArray(response.data.properties)) {
//           const fetchedProperty = response.data.properties[0];
//           const uniqueImages = [...new Set(fetchedProperty.images || [])];
//           setProperty({ ...fetchedProperty, images: uniqueImages });
//         } else {
//           setError(response.data.message || "Property not found");
//         }
//       } catch (err) {
//         setError("Error connecting to the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [id]);

//   return { property, loading, error };
// };

// export default usePropertyDetails;












