export const getLocationByIP = async () => {
    try {
      const response = await fetch("http://www.geoplugin.net/json.gp", {
        headers: {
          "Origin": "https://funeral-services-admin-front.onrender.com/"
        }
      });
      const data = await response.json();
      return {
        city: data.geoplugin_city,
        country: data.geoplugin_countryName,
        latitude: data.geoplugin_latitude,
        longitude: data.geoplugin_longitude,
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };
  