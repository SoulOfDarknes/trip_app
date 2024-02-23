export interface Trip {
    id: string;
    city: string;
    startDate: string | undefined;
    endDate: string;
    image?: string;

}

export interface TripCardProps {
    trip: Trip;
}

export interface WeatherDay {
    datetime: string;
    tempmax: number;
    tempmin: number;
    icon: string;
    conditions: string;
};

export interface SearchBarProps {
    onSearch: (searchValue: string) => void;
}

export interface Weather {
    city: string;
    description: string;
    temperature: number;
}

export interface WeatherSummaryProps {
    weather: Weather;
}

export interface TripsState {
    trips: Trip[];
}

interface CurrentConditions {
    temp: number;
    feelslike: number;
    humidity: number;
    dew: number;
    precip: number;
    windspeed: number;
    winddir: number;
    pressure: number;
    conditions: string;
    icon: string;
}

export interface WeatherResponse {
    days: WeatherDay[];
    currentConditions: CurrentConditions;
}

export interface WeatherWeekInfoProps {
    city: string;
}
export interface WeatherInfoProps {
    city: string;
    startDate: string | undefined;
    endDate: string | undefined;
}

