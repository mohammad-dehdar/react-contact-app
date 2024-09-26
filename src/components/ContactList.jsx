import { useContact } from '../context/ContactContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

function ContactList({ contacts, onEdit, onDelete }) {
  const { dispatch } = useContact();

  const handleToggleSelect = (id) => {
    dispatch({ type: 'TOGGLE_SELECT_CONTACT', payload: id });
  };

  return (
    <div>
      <h2 className="text-xl bg-white p-2 rounded-lg shadow-xl font-semibold mb-2 flex items-baseline">
        Contact List <FontAwesomeIcon icon={faUser} className='ml-2' />
      </h2>
      <ul className='mt-4 border bg-white/10 border-slate-300 p-4 rounded-xl shadow-lg h-[600px] overflow-y-scroll no-scrollbar'>
        {contacts.map((contact) => (
          <li key={contact.id} className="bg-white mb-2 p-2 shadow-md rounded-3xl flex items-center transition-all hover:bg-slate-400">
            <input
              type="checkbox"
              onChange={() => handleToggleSelect(contact.id)}
              className="mr-2"
            />
            <div className="flex-grow space-y-1 max-sm:*:text-sm">
              <p className='capitalize'><FontAwesomeIcon icon={faUser} /> {`${contact.firstName} ${contact.lastName}`}</p>
              <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
              <p><FontAwesomeIcon icon={faPhone} /> {contact.phone}</p>
            </div>
            <div className='flex max-sm:flex-col max-sm:*:w-5 max-sm:*:text-sm max-sm:gap-2'>
              <button
                onClick={() => onEdit(contact)}
                className="transition-all bg-yellow-500 text-white p-1 rounded mr-2 hover:text-yellow-500 hover:bg-transparent"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => onDelete(contact)}
                className="transition-all bg-red-500 text-white p-1 rounded hover:text-red-500 hover:bg-transparent"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
