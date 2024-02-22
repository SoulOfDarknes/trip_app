import React from 'react';
import './styles.css';

interface AddTripButtonProps {
  onOpenModal: () => void; 
}

const AddTripButton: React.FC<AddTripButtonProps> = ({ onOpenModal }) => {
    return (
      <div className='button-wrapper'>
    <div className="add-trip-button" onClick={onOpenModal}>
      <span className="add-trip-icon">+</span>
      <span className="add-trip-text">Add trip</span>
            </div>
        </div>
  );
};

export default AddTripButton;
