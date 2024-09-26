import axios from 'axios';

const BASE_URL = 'http://localhost:3000/contacts';

export const deleteContact = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};

export const deleteContacts = async (ids) => {
  return await Promise.all(ids.map(id => deleteContact(id)));
};

export const addContact = async (contact) => {
  return await axios.post(BASE_URL, contact);
};

export const updateContact = async (id, contact) => {
  return await axios.put(`${BASE_URL}/${id}`, contact);
};

export const getContacts = async () => {
  return await axios.get(BASE_URL);
};
