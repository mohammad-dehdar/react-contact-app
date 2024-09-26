import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteSelectedButton({ onClick, count }) {
  return (
    <button
      onClick={onClick}
      className="transition-all bg-red-400 p-2 rounded-2xl shadow-md mt-4 hover:bg-red-500"
    >
      <FontAwesomeIcon icon={faTrash} className='ml-2' />
      delete {count} selected contacts
    </button>
  );
}

export default DeleteSelectedButton;