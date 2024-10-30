"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';

const parkingSpots = [
  { id: 1, label: "A1", status: "available" },
  { id: 2, label: "A2", status: "occupied" },
  { id: 3, label: "B1", status: "available" },
  { id: 4, label: "B2", status: "available" },
  { id: 5, label: "C1", status: "occupied" },
  { id: 6, label: "C2", status: "available" },
];

const Parking = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotSelect = (spot) => {
    if (spot.status === "available") {
      setSelectedSpot(spot);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">Smart Parking System</h1>
      <p className="text-lg text-gray-600 mb-8">
        Select an available parking spot below.
      </p>

      {/* Parking Grid */}
      <div className="grid grid-cols-3 gap-6">
        {parkingSpots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => handleSpotSelect(spot)}
            className={`p-8 w-40 h-40 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer transition-colors duration-300
              ${
                spot.status === "available"
                  ? "bg-green-200 hover:bg-green-300 text-green-700"
                  : "bg-red-200 text-red-700 cursor-not-allowed"
              }
              ${selectedSpot?.id === spot.id ? "ring-4 ring-blue-400" : ""}
            `}
          >
            {spot.label}
          </div>
        ))}
      </div>

      {/* Selected Spot Info */}
      {selectedSpot && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Spot Selected</h2>
          <p className="text-lg text-gray-700">
            You selected <strong>{selectedSpot.label}</strong>.
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            Confirm Spot
          </button>
        </div>
      )}
    </div>
  );
};

export default Parking;
