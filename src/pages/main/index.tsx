import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from '../../components/SearchBar';
import { Trip } from '../../types';
import { addTrip } from '../../redux/slice/tripsSlice';
import { RootState } from '../../redux/store';
import './styles.css'
import { Header } from 'components/Header';
import { WeatherDashboard } from 'components/WeatherDashboard';
import { WeeklyWeather } from 'components/WeeklyWeather';
import AddTripButton from 'components/AddTripButton';
import AddTripModal from 'components/AddTripModal';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const rawTrips = useSelector((state: RootState) => state.trips.trips);

  const trips = useMemo(() => {
    return rawTrips.filter(trip =>
      trip.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rawTrips, searchTerm]);

  const [selectedCity, setSelectedCity] = useState(trips?.[0]?.city || '');
 
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleAddTrip = (tripData: { city: string; startDate: string; endDate: string }) => {

    const newTrip = {
      id: Date.now().toString(), 
      ...tripData,
    };
    
    dispatch(addTrip(newTrip)); 
    closeModal(); 
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const openModal = () => setIsModalOpen(true);

const closeModal = () => setIsModalOpen(false);

  return (
    <div className='main'>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className='main-content'>
      <WeatherDashboard 
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        trip={trips}
      />
      <AddTripButton onOpenModal={openModal} />
          {isModalOpen && (
      <AddTripModal
            onCloseModal={closeModal} onSaveTrip={handleAddTrip } />
        )}
      </div>
    </div>
  );
};
