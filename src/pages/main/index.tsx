import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from '../../components/SearchBar';
import { addTrip } from '../../redux/slice/tripsSlice';
import { RootState } from '../../redux/store';
import './styles.css'
import { Header } from 'components/Header';
import { WeatherDashboard } from 'components/WeatherDashboard';
import AddTripButton from 'components/AddTripButton';
import AddTripModal from 'components/AddTripModal';
import WeatherSidebar from 'components/WeatherSidebar';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
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

const handleAddTrip = (tripData: { city: string; startDate: string | null; endDate: string | null}) => {
  if (tripData.city && tripData.startDate && tripData.endDate) {
    const formattedTrip = {
      id: Date.now().toString(),
      city: tripData.city,
      startDate: tripData.startDate.toString().split('T')[0],
      endDate: tripData.endDate.toString().split('T')[0]
    };
    dispatch(addTrip(formattedTrip));
  }
};

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='main'>
    <div className='main-wrapper'>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className='main-content'>
      <WeatherDashboard 
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
            searchTerm={searchTerm}
      />
      <AddTripButton onOpenModal={openModal} />
          {isModalOpen && (
      <AddTripModal
              onCloseModal={closeModal}
              onSaveTrip={handleAddTrip} />
        )}
      </div>
      </div>
      <WeatherSidebar selectedCity={selectedCity}/>
    </div>
  );
};
