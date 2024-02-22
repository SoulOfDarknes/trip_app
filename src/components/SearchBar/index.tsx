import { SearchBarProps } from '../../types';
import { ReactComponent as SearchIcon } from '../../assets/img/search.svg';
import './styles.css';
import { useState } from 'react';

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className='wrapper'>
      <SearchIcon className='search-icon'/>
      <input
        className='search'
        type="text"
        placeholder="Search your trip"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};