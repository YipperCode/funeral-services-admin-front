import React, { useEffect, useState } from 'react';
import { getPlans } from '../services/api';
import Plans from '../components/readTables/Plans';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading plans...</p>;
  }

  if (plans.length === 0) {
    return <p className="text-center mt-4">No plans found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plans</h1>
      <Plans plans={plans} />
    </div>
  );
};

export default PlansPage;
