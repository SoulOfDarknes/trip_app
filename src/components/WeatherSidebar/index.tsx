import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchWeatherForCityQuery } from '../../redux/api/weatherApi';
import { RootState } from 'redux/store';
import { weatherIcons } from 'utils/constants';
import { formatDayOfWeek } from 'utils/functions/formatDayOfWeek';
import './styles.css'

interface WeatherSidebarProps {
  selectedCity: string ;
}

const WeatherSidebar: React.FC<WeatherSidebarProps> = ({ selectedCity }) =>{
  const { data: weather, isFetching } = useFetchWeatherForCityQuery({ city: selectedCity });
const [countdown, setCountdown] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

  const selectedTrip = useSelector((state: RootState) =>
    state.trips.trips.find((trip) => trip.city === selectedCity)
  );
    
useEffect(() => {
  if (!selectedTrip || !selectedTrip.startDate) return; 

  const updateCountdown = () => {
    const now = new Date();
    const startDate = selectedTrip.startDate ? new Date(selectedTrip.startDate) : new Date();
    const difference = startDate.getTime() - now.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();

  return () => clearInterval(intervalId);
}, [selectedTrip]);

  if (isFetching) {
    return <div>Loading weather...</div>;
  }

  if (!weather) {
    return <div>No weather data available.</div>;
  }

  const maxTemp = weather.days[0].tempmax;
  const icon = weather.days[0].icon;
  const today = formatDayOfWeek(weather.days[0].datetime.toString());

  const imageUrl = weatherIcons[icon as keyof typeof weatherIcons];

  return (
    <div className="sidebar">
      <div className='side-content'>
      <img src={imageUrl} alt={icon} />
      <div className='today'>
      {weather && (
          <div className='weather'>
            <h2>{today}</h2>
            <p><span>{maxTemp}</span></p>
             <h3>{selectedCity}</h3>
        </div>
          )}
      </div>
      </div>
      <div className="countdown">
          <div><span>{countdown.days}</span><span>days</span></div> 
          <div> <span>{countdown.hours}</span><span>hours</span></div>
          <div><span>{countdown.minutes}</span><span>minutes</span></div>
          <div><span>{countdown.seconds}</span><span>seconds</span></div>
      </div>
    </div>
  );
};

export default WeatherSidebar;
