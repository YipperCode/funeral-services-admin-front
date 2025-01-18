const BASE_URL = process.env.REACT_APP_BASE_URL;

// Users
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Locations
export const getLocations = async () => {
  const response = await fetch(`${BASE_URL}/locations`);
  return response.json();
};

// Plans
export const getPlans = async () => {
  const response = await fetch(`${BASE_URL}/plans`);
  return response.json();
};

export const getPlanById = async (planId) => {
    try {
      const response = await fetch(`${BASE_URL}/plans/${planId}`);
      if (!response.ok) throw new Error("Plan not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching plan:", error);
      throw error;
    }
};

// Sales
export const getSales = async () => {
  const response = await fetch(`${BASE_URL}/sales`);
  return response.json();
};

export const createSale = async (sale) => {
  const response = await fetch(`${BASE_URL}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale),
  });
  return response.json();
};

export const updateSale = async (id, sale) => {
  const response = await fetch(`${BASE_URL}/sales/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale),
  });
  return response.json();
};

export const deleteSale = async (id) => {
  const response = await fetch(`${BASE_URL}/sales/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
