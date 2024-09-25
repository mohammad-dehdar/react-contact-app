import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import { useContact } from '../context/ContactContext';
import axios from 'axios';
import Header from './Header';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContactManager() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const { state, dispatch } = useContact();

  const handleAddContact = () => {
    setIsFormVisible(true);
    setEditingContact(null);
  };

  const handleEditContact = (contact) => {
    setIsFormVisible(true);
    setEditingContact(contact);
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleDeleteSelectedContacts = async () => {
    try {
      await Promise.all(
        state.selectedContacts.map((id) =>
          axios.delete(`http://localhost:3000/contacts/${id}`)
        )
      );
      dispatch({ type: 'DELETE_SELECTED_CONTACTS' });
    } catch (error) {
      console.error('Error deleting selected contacts:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className='flex justify-between mt-20'>
        <SearchBar />
        <button
          onClick={handleAddContact}
          className="bg-sky-500 text-white p-2 mb-4 rounded-2xl shadow-md transition-all hover:bg-sky-600 hover:shadow-none"
        >
          Add New Contact  <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {isFormVisible && (
        <ContactForm
          editingContact={editingContact}
          onClose={() => setIsFormVisible(false)}
        />
      )}
      <ContactList
        contacts={state.contacts.filter((contact) =>
          Object.values(contact).some((value) =>
            value.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        )}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
      {state.selectedContacts.length > 0 && (
        <button
          onClick={handleDeleteSelectedContacts}
          className="transition-all bg-red-400 p-2 rounded-2xl shadow-md mt-4 hover:bg-red-500"
        >
          <FontAwesomeIcon icon={faTrash} className='mr-2'/>
          Delete Slected Contacts
        </button>
      )}
    </div>
  );
}

export default ContactManager;