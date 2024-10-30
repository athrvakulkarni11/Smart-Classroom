"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

// Dr. D.Y. Patil Institute of Technology Location
const drDYPATILLocation = {
  name: "Dr. D.Y. Patil Institute of Technology",
  lat: 18.6228611, // 18°37'22.3"N in decimal format
  lng: 73.815975,  // 73°48'57.9"E in decimal format
  timings: "9:00 AM - 5:00 PM",
};

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, []);

  const SetViewToShowMarkers = () => {
    const map = useMap();
    useEffect(() => {
      const bounds = [[drDYPATILLocation.lat, drDYPATILLocation.lng]];
      if (currentPosition) {
        bounds.push(currentPosition);
      }
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [currentPosition, map]);

    return null;
  };

  const handleGetDirections = () => {
    if (typeof window !== "undefined" && currentPosition) {
      const origin = `${currentPosition[0]},${currentPosition[1]}`;
      const destination = `${drDYPATILLocation.lat},${drDYPATILLocation.lng}`;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert("Current position not available. Please allow location access.");
    }
  };

  // Use a custom PNG image for the marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl: "/gps.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: null,
  });

  return (
    <MapContainer
      center={[drDYPATILLocation.lat, drDYPATILLocation.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        detectRetina={true}
      />

      {currentPosition && (
        <Marker position={currentPosition}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      <Marker
        position={[drDYPATILLocation.lat, drDYPATILLocation.lng]}
        icon={customMarkerIcon}
      >
        <Popup>
          <strong>{drDYPATILLocation.name}</strong>
          <br />
          Timings: {drDYPATILLocation.timings}
          <br />
          <button onClick={handleGetDirections} className="text-red-600 font-bold">
            Get Directions
          </button>
        </Popup>
      </Marker>

      <SetViewToShowMarkers />
    </MapContainer>
  );
};

export default MapComponent;
