export const getLocationByIP = async () => {
  try {
    const response = await fetch(
      "https://api.ipstack.com/check?access_key=c352eabbd29084357030f3b9555964dd"
    );
    const data = await response.json();
    return {
      city: data.city,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
