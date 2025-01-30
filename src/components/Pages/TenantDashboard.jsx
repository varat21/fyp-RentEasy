// import React, { useState, useEffect } from 'react';

// const TenantDashboard = () => {
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [favoriteProperties, setFavoriteProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       const token = localStorage.getItem('token');
      
//       try {
//         // Simulated fetch function - replace with actual fetch logic
//         const fetchData = async (endpoint) => {
//           const response = await fetch(endpoint, {
//             method: 'GET',
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }

//           return await response.json();
//         };

//         const [rentedResponse, favoriteResponse] = await Promise.all([
//           fetchData('http://localhost/rent-easy/public/GetTenantRentedProperties.php'),
//           fetchData('http://localhost/rent-easy/public/GetTenantFavoriteProperties.php')
//         ]);

//         setRentedProperties(rentedResponse);
//         setFavoriteProperties(favoriteResponse);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const renderPropertyCard = (property, rented = false) => (
//     <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="h-48 overflow-hidden">
//         <img 
//           src={`http://localhost/rent-easy/public/uploads/${property.image}`} 
//           alt={property.title} 
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{property.title}</h3>
//         <p className="text-gray-500 text-sm">{property.type} in {property.city}</p>
        
//         <div className="flex justify-between items-center mt-3">
//           <span className="font-semibold">Rs {property.price}/month</span>
//           {rented && (
//             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//               Currently Rented
//             </span>
//           )}
//         </div>

//         <button 
//           className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           onClick={() => window.location.href = `/property/${property.id}`}
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="p-6">
//         <p className="text-gray-500">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Tenant Dashboard</h1>

//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-3">Rented Properties</h2>
//           {rentedProperties.length === 0 ? (
//             <p className="text-gray-500">No active rentals</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {rentedProperties.map(prop => renderPropertyCard(prop, true))}
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-3">Favorite Properties</h2>
//           {favoriteProperties.length === 0 ? (
//             <p className="text-gray-500">No favorite properties</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {favoriteProperties.map(prop => renderPropertyCard(prop))}
//             </div>
//           )}
//         </div>

//         <button 
//           className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
//           onClick={() => window.location.href = '/properties'}
//         >
//           Browse More Properties
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TenantDashboard;