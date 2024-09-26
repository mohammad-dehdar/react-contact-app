import { useState } from 'react';
import { useContact } from '../context/ContactContext';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import Header from './Header';
import ConfirmationDialog from './ConfirmationDialog';
import AddContactButton from './AddContactButton';
import DeleteSelectedButton from './DeleteSelectedButton';
import { deleteContact, deleteContacts } from '../services/contactService';

function ContactManager() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const { state, dispatch } = useContact();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isConfirmMultipleDeleteDialogOpen, setIsConfirmMultipleDeleteDialogOpen] = useState(false);

  const handleAddContact = () => {
    setIsFormVisible(true);
    setEditingContact(null);
  };

  const handleEditContact = (contact) => {
    setIsFormVisible(true);
    setEditingContact(contact);
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete.id);
        dispatch({ type: 'DELETE_CONTACT', payload: contactToDelete.id });
        setIsConfirmDialogOpen(false);
        setContactToDelete(null);
      } catch (error) {
        console.error('error in deleting contact', error);
        alert('deleting contact failed');
      }
    }
  };
  
  const handleDeleteSelectedContacts = () => {
    setIsConfirmMultipleDeleteDialogOpen(true);
  };

  const confirmDeleteSelectedContacts = async () => {
    try {
      await deleteContacts(state.selectedContacts);
      dispatch({ type: 'DELETE_SELECTED_CONTACTS' });
      setIsConfirmMultipleDeleteDialogOpen(false);
    } catch (error) {
      console.error('error in deleting selected contacts', error);
      alert('deleting selected contacts failed');
    }
  };

  const filteredContacts = state.contacts.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <Header />
      <div className='flex justify-between mt-20 max-sm:flex-col-reverse'>
        <SearchBar />
        <AddContactButton onClick={handleAddContact} />
      </div>
      {isFormVisible && (
        <ContactForm
          editingContact={editingContact}
          onClose={() => setIsFormVisible(false)}
        />
      )}
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
      {state.selectedContacts.length > 0 && (
        <DeleteSelectedButton onClick={handleDeleteSelectedContacts} count={state.selectedContacts.length} />
      )}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message={`Are you sure you want to delete?`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsConfirmDialogOpen(false);
          setContactToDelete(null);
        }}
      />
      <ConfirmationDialog
        isOpen={isConfirmMultipleDeleteDialogOpen}
        message={`Do you want to delete ${state.selectedContacts.length} selected contacts?`}
        onConfirm={confirmDeleteSelectedContacts}
        onCancel={() => setIsConfirmMultipleDeleteDialogOpen(false)}
      />
    </div>
  );
}

export default ContactManager;
