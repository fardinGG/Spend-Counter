import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';

function FloatSection() {
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Call weather API using latitude and longitude
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0948401ba60a8c8b7cce143d48eebae3`)
        .then(response => {
          const { name: locationName, weather: weatherData } = response.data;
          const date = new Date();
          const time = date.toLocaleTimeString();
          const formattedDate = `${date.toDateString()}, ${time}`;
          setLocation(locationName);
          setDateTime(formattedDate);
          setWeather(weatherData[0].description);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    });
  }, []);

  return (
    <Draggable>
      <div style={{ position: 'absolute', top: 20, left: 20, background: 'white', padding: 10 }}>
        <h3>Location: {location}</h3>
        <h4>Date & Time: {dateTime}</h4>
        <p>Weather: {weather}</p>
      </div>
    </Draggable>
  );
}

export default FloatSection;
