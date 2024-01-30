/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Axios from "axios";


//to show user the Weather!

const WeatherPage = () => {
  const [weather, setWeather] = useState({ latitude: 0, longitude: 0 });
  const [data, setData] = useState([]);

  const APIKey = "158c8c75a64e32f79478e22cf5e825bd"; // Replace with your actual API key

  const location = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setWeather({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const apiCall = async () => {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.latitude}&lon=${weather.longitude}&exclude={part}&appid=${APIKey}`;

    try {
      const response = await Axios.get(weatherEndpoint);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  useEffect(() => {
    location();
  }, []); // Only call location on mount, not apiCall

  useEffect(() => {
    if (weather.latitude !== 0 && weather.longitude !== 0) {
      apiCall();
    }
  }, [weather]); // Call apiCall when weather coordinates change

  return (
    <div>
      <h1>Weather Page</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default WeatherPage;
