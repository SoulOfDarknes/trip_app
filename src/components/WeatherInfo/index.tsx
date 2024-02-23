import React from 'react';
import { useFetchWeatherForCityQuery } from '../../redux/api/weatherApi';
import './styles.css';
import { cityImages } from 'utils/constants';
import { WeatherInfoProps } from 'types/index';
import { formatDate } from 'utils/functions/formatDate';

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const { data: weatherData, isLoading, error } = useFetchWeatherForCityQuery({ city });
  const imageUrl = cityImages[city as keyof typeof cityImages];

  if (isLoading) return <p>Loading weather for {city}...</p>;
  if (error) return <p>Error loading weather data for {city}.</p>;
  if (!weatherData) return null;
  if (!weatherData || weatherData.days.length < 7) return <p>Not enough data for a 7-day forecast.</p>;

  const firstDayDate = formatDate(weatherData.days[0].datetime);
  const seventhDayDate = formatDate(weatherData.days[6].datetime);

  return (
    <div >
      {imageUrl && <img src={imageUrl} alt={city} />}
      <div className='content'>
        <h3>{city}</h3>
          <div className='days'>
            <p>
          {firstDayDate}
          <span>-</span>
          {seventhDayDate}
          </p>
        </div>
      </div>
    </div>
  );
};

