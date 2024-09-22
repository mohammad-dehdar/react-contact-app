import React, { useState, useEffect } from 'react';
import { useContact } from '../context/ContactContext';
import axios from 'axios';

function ContactForm({ editingContact, onClose }) {
  const { dispatch } = useContact();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'name is invalid';
    if (!formData.lastName) newErrors.lastName = 'last name is invalid';
    if (!formData.email) newErrors.email = 'email is neccessary';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'emial is invalid ';
    if (!formData.phone) newErrors.phone = 'phone number is invalid';
    else if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = 'phone number shoud be 11 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (editingContact) {
          const response = await axios.put(`http://localhost:3000/contacts/${editingContact.id}`, formData);
          dispatch({ type: 'UPDATE_CONTACT', payload: response.data });
        } else {
          const response = await axios.post('http://localhost:3000/contacts', formData);
          dispatch({ type: 'ADD_CONTACT', payload: response.data });
        }
        onClose();
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="name"
          className="w-full p-2 border rounded"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="last Name"
          className="w-full p-2 border rounded"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-2">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="phone number "
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">
        {editingContact ? 'Edit Contact' : ' Add Contact'}
      </button>
      <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
        لغو
      </button>
    </form>
  );
}

export default ContactForm;