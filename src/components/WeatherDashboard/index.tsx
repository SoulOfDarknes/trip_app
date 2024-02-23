import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { WeatherInfo } from 'components/WeatherInfo';
import './styles.css';
import { WeeklyWeather } from 'components/WeeklyWeather';

interface WeatherDashboardProps {
  selectedCity: string;
  onCitySelect: (city: string) => void; 
  searchTerm: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ onCitySelect, selectedCity, searchTerm }) => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const trips = useSelector((state: RootState) => state.trips.trips)
    .filter(trip => trip.city.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.startDate || '1970-01-01').getTime() - new Date(b.startDate || '1970-01-01').getTime());

  const tripsToShow = trips.slice(visibleStartIndex, visibleStartIndex + 3);

  const showPrevButton = visibleStartIndex > 0;
  const showNextButton = visibleStartIndex + 3 < trips.length;

  const handlePrevClick = () => {
    setVisibleStartIndex(Math.max(0, visibleStartIndex - 3));
  };

  const handleNextClick = () => {
    setVisibleStartIndex(Math.min(trips.length - 3, visibleStartIndex + 3));
  };

  return (
    <div className='weather-wrapper'>

      <div className='weather-cards-container'>
              {showPrevButton && (
        <button onClick={handlePrevClick} className='prev-button btn'></button>
      )}
        {tripsToShow.map((trip) => (
          <div key={trip.id} onClick={() => onCitySelect(trip.city)} className={`weather-card ${selectedCity === trip.city ? 'selected' : ''}`}>
            <WeatherInfo city={trip.city} startDate={trip.startDate} endDate={trip.endDate} />
          </div>
        ))}
      {showNextButton && (
        <button onClick={handleNextClick} className='next-button btn'></button>
      )}        
      </div>

      <h2>Week</h2>
      <WeeklyWeather city={selectedCity} />
    </div>
  );
};
