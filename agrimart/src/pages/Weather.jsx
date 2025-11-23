import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./Weather.module.css";
import { FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa";
import {
  WiThermometer,
  WiCloud,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";


const Weather = () => {
  const { t } = useTranslation();
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
      alert(t("geolocationNotSupported"));
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
      

      <div className={styles.weatherContainer}>
        <h2 className={styles.title}>🌤 {t("weatherInfo")}</h2>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={t("searchForCities")}
            className={styles.searchInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className={styles.searchButton}
            onClick={() => fetchWeather(location)}
          >
            <FaSearchLocation /> {t("search")}
          </button>
        </div>
        <div className={styles.centerButton}>
          <button
            className={styles.locationButton}
            onClick={fetchLocationWeather}
          >
            <FaMapMarkerAlt /> {t("useLiveLocation")}
          </button>
        </div>

        <div className={styles.weatherInfo}>
          {loading ? (
            <p>{t("loadingWeather")}</p>
          ) : weather ? (
            <>
              <h3>{weather.name}</h3>
              <p>{weather.weather[0].description}</p>
              <div className={styles.weatherDetails}>
                <div className={styles.weatherDetailItem}>
                  <WiThermometer /> {t("temp")}: {Math.round(weather.main.temp)}°C
                </div>
                <div className={styles.weatherDetailItem}>
                  <WiCloud /> {t("cloudiness")}: {weather.clouds.all}%
                </div>
                <div className={styles.weatherDetailItem}>
                  <WiHumidity /> {t("humidity")}: {weather.main.humidity}%
                </div>
                <div className={styles.weatherDetailItem}>
                  <WiStrongWind /> {t("wind")}: {weather.wind.speed} m/s
                </div>
              </div>

              <div className={styles.forecastContainer}>
                <h3>📅 {t("sevenDayForecast")}</h3>
                <div className={styles.forecastGrid}>
                  {["☀️", "☀️", "☀️", "☁️", "☁️", "🌧️", "⛈️"].map(
                    (icon, index) => (
                      <div key={index} className={styles.forecastItem}>
                        <p>{t("day")} {index + 1}</p>
                        <p>{icon}</p>
                        <p>37°C / 21°C</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>{t("noWeatherDataAvailable")}</p>
          )}
        </div>
      </div>
     
    </>
  );
};

export default Weather;
