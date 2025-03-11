import React, { useState } from "react";
import axios from "axios";
import styles from "./Weather.module.css";
import { FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa";
import { WiThermometer, WiCloud, WiStrongWind, WiHumidity } from "react-icons/wi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");


  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
     
  
    <div className={styles.weatherContainer}>
      <h2 className={styles.title}>🌤 Weather Info</h2>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for cities..."
          className={styles.searchInput}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className={styles.searchButton} onClick={() => fetchWeather(location)}>
          <FaSearchLocation /> Search
        </button>
      </div>
      <div className={styles.centerButton}>
        <button className={styles.locationButton} onClick={fetchLocationWeather}>
          <FaMapMarkerAlt /> Use Live Location
        </button>
      </div>

      <div className={styles.weatherInfo}>
        {loading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <>
            <h3>{weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <div className={styles.weatherDetails}>
            <div className={styles.weatherDetailItem}>
              <WiThermometer/> Temp: {Math.round(weather.main.temp)}°C</div>
              <div className={styles.weatherDetailItem}>
              <WiCloud /> Cloudiness: {weather.clouds.all}%</div>
              <div className={styles.weatherDetailItem}>
              <WiHumidity /> Humidity: {weather.main.humidity}%</div>
              <div className={styles.weatherDetailItem}>
              <WiStrongWind /> Wind: {weather.wind.speed} m/s</div>
            </div>

            <div className={styles.forecastContainer}>
              <h3>📅 7-Day Forecast</h3>
              <div className={styles.forecastGrid}>
                {["☀️", "☀️", "☀️", "☁️", "☁️", "🌧️", "⛈️"].map((icon, index) => (
                  <div key={index} className={styles.forecastItem}>
                    <p>Day {index + 1}</p>
                    <p>{icon}</p>
                    <p>37°C / 21°C</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    </div>
     <Footer />
    </>
  );
};

export default Weather;
