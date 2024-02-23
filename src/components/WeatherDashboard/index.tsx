import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import './styles.css'
import { WeatherInfo } from 'components/WeatherInfo';
import { Trip } from 'types/index';
import { WeeklyWeather } from 'components/WeeklyWeather';

interface WeatherDashboardProps {
  selectedCity: string;
  onCitySelect: (city: string) => void; 
  trip: Trip[];
}

export const WeatherDashboard : React.FC<WeatherDashboardProps> = ({ onCitySelect, selectedCity, trip})  => {
  const trips = useSelector((state: RootState) => state.trips.trips);


  console.log('trips', trips)
  return (
    <div className='weather-wrapper'>
      <div className="weather-dashboard">
      {trips.map((trip) => (
                <div
          key={trip.id}
          onClick={() => onCitySelect(trip.city)}
          className={`weather-card ${selectedCity === trip.city ? 'selected' : ''}`}
        >
          <WeatherInfo key={trip.id} city={trip.city} startDate={trip.startDate} endDate={trip.endDate} />
          
        </div>
       
      ))}
      </div>
      <h2>Week</h2>
      <WeeklyWeather city={selectedCity} />
    </div>
  );
};