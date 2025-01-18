import React, { useEffect, useState } from "react";
import { getLocationByIP } from "../services/locationService";
import { getLocations } from "../services/api";

const LocationSuggestion = () => {
  const [location, setLocation] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const clientLocation = await getLocationByIP();
        setLocation(clientLocation);

        const locations = await getLocations();
        const closest = locations.reduce((prev, curr) => {
          const prevDistance = calculateDistance(
            clientLocation.latitude,
            clientLocation.longitude,
            prev.latitude,
            prev.longitude
          );
          const currDistance = calculateDistance(
            clientLocation.latitude,
            clientLocation.longitude,
            curr.latitude,
            curr.longitude
          );
          return prevDistance < currDistance ? prev : curr;
        });

        setNearestLocation(closest);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocation();
  }, []);

  if (!location || !nearestLocation) {
    return (
      <div className="p-6 bg-gray-100 rounded-md shadow-md animate-pulse">
        <p className="text-center text-gray-500">Loading location...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Location</h2>
      <div className="mb-6">
        <p className="text-gray-600">
          <strong>City:</strong> {location.city}
        </p>
        <p className="text-gray-600">
          <strong>Country:</strong> {location.country}
        </p>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Nearest Location
      </h3>
      <div className="p-4 bg-gray-100 rounded-md shadow-inner">
        <p className="text-gray-600">
          <strong>Name:</strong> {nearestLocation.name}
        </p>
        <p className="text-gray-600">
          <strong>City:</strong> {nearestLocation.city}
        </p>
        <p className="text-gray-600">
          <strong>State:</strong> {nearestLocation.state}
        </p>
        <p className="text-gray-600">
          <strong>Distance:</strong>{" "}
          {calculateDistance(
            location.latitude,
            location.longitude,
            nearestLocation.latitude,
            nearestLocation.longitude
          ).toFixed(2)}{" "}
          km
        </p>
      </div>
    </div>
  );
};

export default LocationSuggestion;
