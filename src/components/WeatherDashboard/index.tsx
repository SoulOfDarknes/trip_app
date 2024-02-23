import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Slider from 'react-slick';
import { WeatherInfo } from 'components/WeatherInfo';
import { WeeklyWeather } from 'components/WeeklyWeather';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

interface WeatherDashboardProps {
  selectedCity: string;
  onCitySelect: (city: string) => void; 
  searchTerm: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ onCitySelect, selectedCity, searchTerm}) => {
  const trips = useSelector((state: RootState) => state.trips.trips).filter(trip => 
    trip.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className='weather-wrapper'>
      <Slider {...settings}>
        {trips.map((trip) => (
          <div key={trip.id} onClick={() => onCitySelect(trip.city)} className={`weather-card ${selectedCity === trip.city ? 'selected' : ''}`}>
            <WeatherInfo key={trip.id} city={trip.city} startDate={trip.startDate} endDate={trip.endDate} />
          </div>
        ))}
      </Slider>
      <h2>Week</h2>
      <WeeklyWeather city={selectedCity} />
    </div>
  );
};
