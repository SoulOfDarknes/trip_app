import { DailyWeather } from "components/DailyWeather";
import { useFetchWeatherForCityQuery } from "../../redux/api/weatherApi";
import { WeatherInfoProps } from "types/index";
import './styles.css'

export const WeeklyWeather : React.FC<WeatherInfoProps> = ({ city }) => {
  const { data: weatherData, isLoading, error } = useFetchWeatherForCityQuery({ city });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: loading</p>;
  if (!weatherData) return null;

  const firstSevenDays = weatherData.days.slice(0, 7);

  return (
    <div className="weekly-weather">
      {firstSevenDays.map(day => (
        <DailyWeather key={day.datetime} day={day} />
      ))}
    </div>
  );
};