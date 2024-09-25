import { useContact } from '../context/ContactContext';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SearchBar() {
  const { state, dispatch } = useContact();

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
  };

  return (
    <div className="mb-4 flex p-2 items-center border rounded-2xl">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type="text"
        placeholder="Search Contacts..."
        value={state.searchTerm}
        onChange={handleSearchChange}
        className="w-full ml-2 bg-transparent focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;