import { create } from 'zustand';

const useBookingStore = create((set) => ({
  bookedProperties: [], // List of booked properties
  totalAmount: 0, // Total price of bookings

  // Add a property to bookings
  bookProperty: (property) => {
    set((state) => ({
      bookedProperties: [
        ...state.bookedProperties,
        {
          ...property,
          bookingId: Date.now(), // Unique ID
          bookingDate: new Date(), // Timestamp
        },
      ],
      totalAmount: state.totalAmount + (property.price || 0), // Update total
    }));
  },

  // Remove a property from bookings
  removeProperty: (bookingId) => {
    set((state) => {
      const property = state.bookedProperties.find((p) => p.bookingId === bookingId);
      return {
        bookedProperties: state.bookedProperties.filter((p) => p.bookingId !== bookingId), // Remove booking
        totalAmount: state.totalAmount - (property?.price || 0), // Adjust total
      };
    });
  },

  // Clear all bookings
  clearBookings: () => set({ bookedProperties: [], totalAmount: 0 }),
}));

export default useBookingStore;