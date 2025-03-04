// import React from 'react';
// import { motion } from 'framer-motion';
// import { Button, Card, Group, Text, Title, Badge, Rating } from '@mantine/core';
// import { toast } from 'react-hot-toast';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import useBookingStore from '../stores/useBookingStore';
// import { Trash } from 'lucide-react';
// import WhatApps from '../Pages/whatApps';

// const Property = () => {
//   const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
//   const navigate = useNavigate();
//   // console.log("User ID:", id);
//   console.log("Booked Properties:", bookedProperties);


//   const handleRemoveProperty = (bookingId) => {
//     removeProperty(bookingId);
//     toast.success('Property removed from bookings');
//   };

//   // const handleCheckout = () => {
//   //   clearBookings();
//   //   toast.success('Booking completed successfully!');
//   //   navigate('/');
//   // };

//   // Group properties by property ID to show booking count
//   const groupedProperties = bookedProperties.reduce((acc, property) => {
//     if (!acc[property.id]) {
//       acc[property.id] = [];
//     }
//     acc[property.id].push(property);
//     return acc;
//   }, {});

//   // Calculate average rating for a property
//   const calculateAverageRating = (ratings) => {
//     if (!ratings || ratings.length === 0) return 0;
//     const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   if (bookedProperties.length === 0) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
//         <Title order={2} className="mb-4">No Properties Booked</Title>
//         <Text color="dimmed" className="mb-6">You haven't booked any properties yet.</Text>
//         <Button
//           onClick={() => navigate('/')}
//           variant="filled"
//         >
//           Browse Properties
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto p-4 max-w-6xl"
//     >
//       <Title order={1} className="mb-8">My Booked Properties</Title>

//       <div className="space-y-6">
//         {bookedProperties.map((property) => (
//           <Card key={property.bookingId} shadow="sm" padding="lg" radius="md" withBorder>
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="w-full md:w-1/4">
//                 <img
//                   src={property.images?.[0] || '/default-property.jpg'}
//                   alt={property.title}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//               </div>

//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <Group>
//                       <Title order={3}>{property.title}</Title>
//                       <Badge variant="filled" size="lg">
//                         Booking #{groupedProperties[property.id].findIndex(p => p.bookingId === property.bookingId) + 1}
//                       </Badge>
//                     </Group>
//                     <Text color="dimmed" className="mt-2">{property.description}</Text>
//                   </div>
//                   <Button
//                     onClick={() => handleRemoveProperty(property.bookingId)}
//                     variant="subtle"
//                     color="red"
//                   >
//                     <Trash size={20} />
//                   </Button>
//                 </div>

//                 {/* Display Average Rating */}
//                 {property.ratings && property.ratings.length > 0 && (
//                   <div className="mt-4 flex items-center gap-2">
//                     <Rating value={calculateAverageRating(property.ratings)} readOnly size="sm" />
//                     <Text size="sm" color="dimmed">
//                       {calculateAverageRating(property.ratings)} ({property.ratings.length} reviews)
//                     </Text>
//                   </div>
//                 )}

//                 <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <Text size="sm" color="dimmed">Price</Text>
//                     <Text weight={600}>{property.price}</Text>
//                   </div>
//                   <div>
//                     <Text size="sm" color="dimmed">Location</Text>
//                     <Text weight={600}>{property.city}, {property.country}</Text>
//                   </div>
//                   <div>
//                     <Text size="sm" color="dimmed">Size</Text>
//                     <Text weight={600}>{property.dimension} sqft</Text>
//                   </div>
//                   <div>
//                     <Text size="sm" color="dimmed">Booked On</Text>
//                     <Text weight={600}>{moment(property.bookingDate).format('MMM DD, YYYY')}</Text>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}

//         <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
//           <Group position="apart" className="mb-6">
//             <Title order={3}>Booking Summary</Title>
//             <div>
//               <Text size="sm" color="dimmed">Total Bookings: {bookedProperties.length}</Text>
//               {/* <Text size="xl" weight={700}>Total Amount: ${totalAmount.toFixed(2)}</Text> */}
//             </div>
//           </Group>

//           <Group position="right" spacing="md">
//             <Button
//               onClick={() => navigate('/')}
//               variant="outline"
//             >
//               Continue Browsing
//             </Button>
//             <Button
//               // onClick={handleCheckout}
//               variant="filled"
//             >
//               Complete Payment
//             </Button>
//           </Group>
//         </Card>
//       </div>
//       <WhatApps />

//     </motion.div>
//   );
// };

// export default Property;




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Group, Text, Title, Badge, Rating, Modal } from '@mantine/core';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../stores/useBookingStore';
import { Trash } from 'lucide-react';
import WhatApps from '../Pages/whatApps';

const Property = () => {
  const { bookedProperties, totalAmount, removeProperty, clearBookings } = useBookingStore();
  const navigate = useNavigate();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  console.log("Booked Properties:", bookedProperties);
  console.log("Total Amount:", totalAmount, typeof totalAmount);

  // Ensure totalAmount is a number to prevent errors
  const totalPrice = Number(totalAmount || 0).toFixed(2);

  const handleRemoveProperty = (bookingId) => {
    removeProperty(bookingId);
    toast.success('Property removed from bookings');
  };

  const handlePayment = () => {
    clearBookings();
    toast.success('Payment completed successfully!');
    setPaymentModalOpen(false);
    navigate('/');
  };

  const groupedProperties = bookedProperties.reduce((acc, property) => {
    if (!acc[property.id]) {
      acc[property.id] = [];
    }
    acc[property.id].push(property);
    return acc;
  }, {});

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  if (bookedProperties.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <Title order={2} className="mb-4">No Properties Booked</Title>
        <Text color="dimmed" className="mb-6">You haven't booked any properties yet.</Text>
        <Button onClick={() => navigate('/')} variant="filled">
          Browse Properties
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-6xl"
    >
      <Title order={1} className="mb-8">My Booked Properties</Title>

      <div className="space-y-6">
        {bookedProperties.map((property) => (
          <Card key={property.bookingId} shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <img
                  src={property.images?.[0] || '/default-property.jpg'}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Group>
                      <Title order={3}>{property.title}</Title>
                      <Badge variant="filled" size="lg">
                        Booking #{groupedProperties[property.id].findIndex(p => p.bookingId === property.bookingId) + 1}
                      </Badge>
                    </Group>
                    <Text color="dimmed" className="mt-2">{property.description}</Text>
                  </div>
                  <Button onClick={() => handleRemoveProperty(property.bookingId)} variant="subtle" color="red">
                    <Trash size={20} />
                  </Button>
                </div>

                {property.ratings && property.ratings.length > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <Rating value={calculateAverageRating(property.ratings)} readOnly size="sm" />
                    <Text size="sm" color="dimmed">
                      {calculateAverageRating(property.ratings)} ({property.ratings.length} reviews)
                    </Text>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Text size="sm" color="dimmed">Price</Text>
                    <Text weight={600}>{property.price}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Location</Text>
                    <Text weight={600}>{property.city}, {property.country}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Size</Text>
                    <Text weight={600}>{property.dimension} sqft</Text>
                  </div>
                  <div>
                    <Text size="sm" color="dimmed">Booked On</Text>
                    <Text weight={600}>{moment(property.bookingDate).format('MMM DD, YYYY')}</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
          <Group position="apart" className="mb-6">
            <Title order={3}>Booking Summary</Title>
            <div>
              <Text size="sm" color="dimmed">Total Bookings: {bookedProperties.length}</Text>
              <Text size="xl" weight={700}>Total Amount: ${totalPrice}</Text>
            </div>
          </Group>

          <Group position="right" spacing="md">
            <Button onClick={() => navigate('/')} variant="outline">
              Continue Browsing
            </Button>
            <Button onClick={() => setPaymentModalOpen(true)} variant="filled">
              Complete Payment
            </Button>
          </Group>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal opened={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Complete Payment" centered>
        <div className="p-4">
         
          <Text color="dimmed" className="mb-4">Please confirm your payment to complete the booking.</Text>
          <Group position="right">
            <Button onClick={() => setPaymentModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handlePayment} variant="filled">
              Confirm Payment
            </Button>
          </Group>
        </div>
      </Modal>

      <WhatApps />
    </motion.div>
  );
};

export default Property;
