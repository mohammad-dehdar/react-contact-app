import React from 'react';
import { useContact } from '../context/ContactContext';

function SearchBar() {
  const { state, dispatch } = useContact();

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Contacts..."
        value={state.searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default SearchBar;