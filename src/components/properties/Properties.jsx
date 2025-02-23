import React from "react";
import useBookingStore from "../stores/useBookingStore";

const bookProperty = () => {
  const { bookProperty } = useBookingStore();

  if (!bookProperty) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold">{bookProperty.title}</h2>
      <p className="text-gray-600">{bookProperty.description}</p>
      <p>
        <strong>Dimension:</strong> {bookProperty.dimension}
      </p>
      <p>
        <strong>Road Type:</strong> {bookProperty.road_type}
      </p>
    </div>
  );
};

export default bookProperty;
