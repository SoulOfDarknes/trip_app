import React from 'react';
import { WeatherDay } from "types/index";
import { weatherIcons } from 'utils/constants';
import { formatDayOfWeek } from 'utils/functions/formatDayOfWeek';
import './styles.css'

export const DailyWeather: React.FC<{ day: WeatherDay }> = ({ day }) => {
  const imageUrl = weatherIcons[day.icon as keyof typeof weatherIcons];

  return (
    <div className="daily-weather">
      <p>{formatDayOfWeek(day.datetime)}</p>
      <img src={imageUrl} alt={day.conditions} />
      <p>{day.tempmax}° / {day.tempmin}°</p>
    </div>
  );
};
