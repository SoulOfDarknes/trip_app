import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import '../../assets/styles/react-datapicker.css';
import './styles.css';
import { cities } from 'utils/mock/mock';

interface AddTripModalProps {
  onCloseModal: () => void;
  onSaveTrip: (tripData: { city: string; startDate: string | null; endDate: string | null }) => void; 
}


const AddTripModal: React.FC<AddTripModalProps> = ({ onCloseModal, onSaveTrip }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  const startDateFormatted = startDate ? startDate.toLocaleDateString('en-CA') : null; // 'en-CA' формат YYYY-MM-DD
const endDateFormatted = endDate ? endDate.toLocaleDateString('en-CA') : null;

  
const handleSave = () => {
  if (city && startDate && endDate) {
    onSaveTrip({ 
      city, 
      startDate: startDateFormatted, 
      endDate: endDateFormatted 
    });
    onCloseModal();
  }
};



  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-head'>
          <h2>Create trip</h2>
          <span className="close" onClick={onCloseModal}></span> 
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <label>
            City
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="" disabled>Please select a city</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
          </label>
          <label>
            Start date
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              minDate={today}
              maxDate={maxDate}
              dateFormat="yyyy-MM-dd"
              placeholderText='Select date'
            />
          </label>
          <label>
            End date
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date(today.getTime() + 86400000)}
              maxDate={maxDate}
              dateFormat="yyyy-MM-dd"
              placeholderText='Select date'
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
