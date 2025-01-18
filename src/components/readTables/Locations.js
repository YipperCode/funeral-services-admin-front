import React, { useEffect, useState } from 'react';
import { getLocations } from '../../services/api';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  return (
    <div className="overflow-x-auto">
    <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Latitude</th>
            <th className="px-4 py-2">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location._id}
              className="border-t hover:bg-gray-200"
            >
              <td className="px-4 py-2">{location._id}</td>
              <td className="px-4 py-2">{location.name}</td>
              <td className="px-4 py-2">{location.city}</td>
              <td className="px-4 py-2">{location.state}</td>
              <td className="px-4 py-2">{location.latitude}</td>
              <td className="px-4 py-2">{location.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
