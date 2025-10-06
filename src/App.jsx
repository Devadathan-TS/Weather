import React, { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "dc034b133419a19aff3207b2d39d5aae";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found. Try again.");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
      setWeather(null);
    }
  };

  const clearData = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "30px",
          backgroundColor: "transparent",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#23ce614c", marginBottom: "20px" }}>
          🌤 Weather App
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 5px",
            borderRadius: "10px",
            border: "1px solid #ccccccff",
            marginBottom: "15px",
            fontSize: "16px",
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={fetchWeather}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#22b84a5e",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            onClick={clearData}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #0d972b5d",
              backgroundColor: "#fff",
              color: "#1ab03d80",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
        )}

        {/* Weather Data */}
        {weather && weather.main && (
          <div
            style={{
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "rgba(78, 222, 143, 0.26)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            {/* Weather Icon */}
            <div style={{ fontSize: "60px", marginBottom: "10px" }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>

            <h3 style={{ marginBottom: "10px" }}>
              {weather.name}, {weather.sys.country}
            </h3>
            <p style={{ textTransform: "capitalize", marginBottom: "10px" }}>
              {weather.weather[0].description}
            </p>
            <h1 style={{ color: "#0e458cc3", marginBottom: "20px" }}>
              {Math.round(weather.main.temp)}°C
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                fontSize: "15px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <AirIcon style={{ color: "#0077b6" }} /> Wind: {weather.wind.speed} m/s
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <OpacityIcon style={{ color: "#0077b6" }} /> Humidity: {weather.main.humidity}%
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <SpeedIcon style={{ color: "#0077b6" }} /> Pressure: {weather.main.pressure} hPa
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <AccessTimeIcon style={{ color: "#0077b6" }} /> Timezone: {weather.timezone} sec
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;




