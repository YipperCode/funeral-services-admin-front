import React, { useEffect, useState } from 'react';
import { getPlans } from '../../services/api';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      setPlans(data);
    };
    fetchPlans();
  }, []);

  return (
    <div className="overflow-x-auto">
    <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan._id}
              className="border-t hover:bg-gray-200"
            >
              <td className="px-4 py-2">{plan._id}</td>
              <td className="px-4 py-2">{plan.name}</td>
              <td className="px-4 py-2">{plan.description}</td>
              <td className="px-4 py-2">{plan.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Plans;
