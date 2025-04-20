// // import { create } from 'zustand';

// // const useBookingStore = create((set) => ({
// //   bookedProperties: [], // List of booked properties
// //   totalAmount: 0, // Total price of bookings

// //   // Add a property to bookings
// //   bookProperty: (property) => {
// //     set((state) => ({
// //       bookedProperties: [
// //         ...state.bookedProperties,
// //         {
// //           ...property,
// //           bookingId: Date.now(), // Unique ID
// //           bookingDate: new Date(), // Timestamp
// //         },
// //       ],
// //       totalAmount: state.totalAmount + (property.price), // Update total
// //     }));
// //   },

// //   // Remove a property from bookings
// //   removeProperty: (bookingId) => {
// //     set((state) => {
// //       const property = state.bookedProperties.find((p) => p.bookingId === bookingId);
// //       return {
// //         bookedProperties: state.bookedProperties.filter((p) => p.bookingId !== bookingId), // Remove booking
// //         totalAmount: state.totalAmount - (property?.price ), // Adjust total
// //       };
// //     });
// //   },

// //   // Clear all bookings
// //   clearBookings: () => set({ bookedProperties: [], totalAmount: ""}),
// // }));

// // export default useBookingStore;

// import { create } from 'zustand';

// const useBookingStore = create((set) => ({
//   bookedProperties: [],
//   totalAmount: 0,
//   userId: null,
//   appliedPromoCode: null,
//   bookProperty: (property) => {
//     set((state) => {
//       const priceAsNumber = Number(property.price);
//       return {
//         bookedProperties: [
//           ...state.bookedProperties,
//           {
//             ...property,
//             bookingId: Date.now(),
//             bookingDate: new Date(),
//           },
//         ],
//         totalAmount: state.totalAmount + priceAsNumber,
//       };
//     });
//   },
//   removeProperty: (bookingId) => {
//     set((state) => {
//       const property = state.bookedProperties.find((p) => p.bookingId === bookingId);
//       const priceAsNumber = Number(property?.price || 0);
//       return {
//         bookedProperties: state.bookedProperties.filter((p) => p.bookingId !== bookingId),
//         totalAmount: state.totalAmount - priceAsNumber,
//       };
//     });
//   },
//   clearBookings: () => set({ bookedProperties: [], totalAmount: 0, appliedPromoCode: null }),
//   setUserId: (id) => set({ userId: id }), // Add this to set userId
//   setPromoCode: (promoCode) => set({ appliedPromoCode: promoCode }),
//   clearPromoCode: () => set({ appliedPromoCode: null }),
// }));

// export default useBookingStore;



import { create } from 'zustand';

const useBookingStore = create((set) => ({
  bookedProperty: null,
  totalAmount: 0,
  userId: null,
  appliedPromoCode: null,
  bookProperty: (property) => {
    console.log('Booking property:', property);
    set(() => {
      const priceAsNumber = Number(property.price);
      const newState = {
        bookedProperty: {
          ...property,
          bookingId: Date.now(),
          bookingDate: new Date(),
        },
        totalAmount: priceAsNumber,
      };
      console.log('New state:', newState);
      return newState;
    });
  },
  removeProperty: () => {
    console.log('Removing property');
    set(() => ({
      bookedProperty: null,
      totalAmount: 0,
      appliedPromoCode: null,
    }));
  },
  clearBookings: () => {
    console.log('Clearing bookings');
    set({ 
      bookedProperty: null, 
      totalAmount: 0, 
      appliedPromoCode: null 
    });
  },
  setUserId: (id) => set({ userId: id }),
  setPromoCode: (promoCode) => set({ appliedPromoCode: promoCode }),
  clearPromoCode: () => set({ appliedPromoCode: null }),
}));

export default useBookingStore;