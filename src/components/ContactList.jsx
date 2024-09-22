import React from 'react';
import { useContact } from '../context/ContactContext';

function ContactList({ contacts, onEdit, onDelete }) {
  const { dispatch } = useContact();

  const handleToggleSelect = (id) => {
    dispatch({ type: 'TOGGLE_SELECT_CONTACT', payload: id });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2 p-2 border rounded flex items-center">
            <input
              type="checkbox"
              onChange={() => handleToggleSelect(contact.id)}
              className="mr-2"
            />
            <div className="flex-grow">
              <p>{`${contact.firstName} ${contact.lastName}`}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <button
              onClick={() => onEdit(contact)}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              edit
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;