import React, { useEffect, useState } from 'react';
import { getLocations } from '../services/api';
import Locations from '../components/readTables/Locations';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading locations...</p>;
  }

  if (locations.length === 0) {
    return <p className="text-center mt-4">No locations found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>
      <Locations locations={locations} />
    </div>
  );
};

export default LocationsPage;
