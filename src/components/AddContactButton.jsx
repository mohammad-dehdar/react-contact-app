import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddContactButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-500 text-white p-2 mb-4 rounded-2xl shadow-md transition-all hover:bg-sky-600 hover:shadow-none"
    >
      Add new Contact <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export default AddContactButton;