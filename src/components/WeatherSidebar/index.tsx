import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchWeatherForCityQuery } from '../../redux/api/weatherApi';
import { RootState } from 'redux/store';

interface WeatherSidebarProps {
  selectedCity: string ;
}

const WeatherSidebar: React.FC<WeatherSidebarProps> = ({ selectedCity }) =>{
  const { data: weather, isFetching } = useFetchWeatherForCityQuery({ city: selectedCity });

  const selectedTrip = useSelector((state: RootState) =>
    state.trips.trips.find((trip) => trip.city === selectedCity)
  );

    const [countdown, setCountdown] = useState('');
    
useEffect(() => {
  if (!selectedTrip || !selectedTrip.startDate) return; 

  const updateCountdown = () => {
    const now = new Date();
    const startDate = selectedTrip.startDate ? new Date(selectedTrip.startDate) : new Date();
    const difference = startDate.getTime() - now.getTime();

    // Розрахунок різниці в часі
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();

  return () => clearInterval(intervalId);
}, [selectedTrip]);



console.log('datea', selectedTrip)

    
  if (isFetching) {
    return <div>Loading weather...</div>;
  }

  if (!weather) {
    return <div>No weather data available.</div>;
  }

  return (
    <div className="sidebar">
      <h2>Weather for {selectedCity}</h2>
      {weather && (
        <>
          {/* <p>{weather.temp}°C</p> */}
          {/* <p>{weather.description}</p> */}
        </>
      )}
      <div className="countdown">
        <h3>Countdown to trip:</h3>
        <p>{countdown}</p>
      </div>
    </div>
  );
};

export default WeatherSidebar;
