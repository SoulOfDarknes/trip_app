import React, { useState } from 'react';
import './styles.css';
import { cities } from 'utils/mock/mock';

interface AddTripModalProps {
  onCloseModal: () => void;
  onSaveTrip: (trip: { city: string; startDate: string; endDate: string }) => void;
}

const AddTripModal: React.FC<AddTripModalProps> = ({ onCloseModal, onSaveTrip }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  const handleSave = () => {
    if (city && startDate && endDate) {
      onSaveTrip({ city, startDate, endDate });
      onCloseModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-head'>
          <h2>Create trip</h2>
          <span className="close" onClick={onCloseModal}>&times;</span>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <label>
            City
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="" disabled>Please select a city</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Start date
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              min={today.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
              required 
            />
          </label>
          <label>
            End date
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              min={today.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
              required 
            />
          </label>
        </form>
        <div className="modal-actions">
          <button className='btn-save' type="button" onClick={handleSave}>Save</button>
          <button className='btn-cancel' type="button" onClick={onCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTripModal;
