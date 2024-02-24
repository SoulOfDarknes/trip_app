import React, { useState, useEffect } from 'react';
import './styles.css';
import { cities } from 'utils/mock/mock';

interface AddTripModalProps {
  onCloseModal: () => void;
  onSaveTrip: (tripData: { city: string; startDate: string | null; endDate: string | null }) => void;
}

const AddTripModal: React.FC<AddTripModalProps> = ({ onCloseModal, onSaveTrip }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 15);
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      const adjustedEndDate = new Date(startDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
      setEndDate(adjustedEndDate.toISOString().split('T')[0]);
    }
  }, [startDate, endDate]);

  const handleSave = () => {
    if (city && startDate && endDate) {
      onSaveTrip({ 
        city, 
        startDate, 
        endDate
      });
      onCloseModal();
    }
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="modal" onClick={onCloseModal}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <div className='modal-head'>
          <h2>Create trip</h2>
          <span className="close" onClick={onCloseModal}></span> 
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <label>
            <span>City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Please select a city</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              max={formattedMaxDate}
            />
          </label>
          <label>
            <span>End date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate ? new Date(startDate).toISOString().split('T')[0] : today}
              max={formattedMaxDate}
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
