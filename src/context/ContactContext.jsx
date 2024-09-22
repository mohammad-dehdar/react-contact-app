import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const ContactContext = createContext();

const initialState = {
  contacts: [],
  selectedContacts: [],
  searchTerm: '',
};

function contactReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    case 'DELETE_SELECTED_CONTACTS':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => !state.selectedContacts.includes(contact.id)),
        selectedContacts: [],
      };
    case 'TOGGLE_SELECT_CONTACT':
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter((id) => id !== action.payload)
          : [...state.selectedContacts, action.payload],
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts');
      dispatch({ type: 'SET_CONTACTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  return useContext(ContactContext);
}