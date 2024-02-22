import { WeatherSummaryProps } from '../../types';
import './styles.css';

export const WeatherSummary = ({ weather }: WeatherSummaryProps) => {
  return (
    <div className='weatherSummary'>
      <h2>{weather.city}</h2>
      <p>{weather.description}</p>
      <h3>{`${weather.temperature}°C`}</h3>
    </div>
  );
};
