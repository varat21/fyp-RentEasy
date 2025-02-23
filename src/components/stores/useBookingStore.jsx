import { create } from "zustand";

const useBookingStore = create((set) => ({
  booking: null, // Holds booking details
  
  bookProperty: (property) => {
    console.log("Storing in Zustand:", property); // ✅ Debugging Zustand
    set({ booking: property });
  },

  cancelBooking: () => set({ booking: null }),
}));

export default useBookingStore;
