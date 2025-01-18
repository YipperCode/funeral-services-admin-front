export const getLocationByIP = async () => {
  try {
    const response = await fetch(
      `http://api.ipstack.com/check?access_key=YOUR_ACCESS_KEY`
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
