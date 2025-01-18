import React from "react";
import LocationSuggestion from "../components/LocationSuggestion";

const Dashboard = () => {
  return (
    <div>
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Funeral Services Admin</h1>
            <LocationSuggestion />
        </div>
    </div>
  );
};

export default Dashboard;
