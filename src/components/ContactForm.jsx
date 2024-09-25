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
    <form onSubmit={handleSubmit} className="transition-all mb-4 bg-white shadow-md border border-slate-200 rounded-3xl p-4">
      <div className="mb-2">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="name"
          className="w-full shadow-md p-2 border border-slate-200 bg-transparent  focus:outline-none focus:border-slate-400 rounded-3xl"
        />
        {errors.firstName && <p className="bg-red-500 w-fit px-2 rounded-lg shadow-md text-white mx-2 mt-[3px]">{errors.firstName}</p>}
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="last Name"
          className="w-full shadow-md p-2 border border-slate-200 bg-transparent  focus:outline-none focus:border-slate-400 rounded-3xl"
        />
        {errors.lastName && <p className="bg-red-500 w-fit px-2 rounded-lg shadow-md text-white mx-2 mt-[3px]">{errors.lastName}</p>}
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          className="w-full shadow-md p-2 border border-slate-200 bg-transparent  focus:outline-none focus:border-slate-400 rounded-3xl"
        />
        {errors.email && <p className="bg-red-500 w-fit px-2 rounded-lg shadow-md text-white mx-2 mt-[3px]">{errors.email}</p>}
      </div>
      <div className="mb-2">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="phone number "
          className="w-full shadow-md p-2 border border-slate-200 bg-transparent  focus:outline-none focus:border-slate-400 rounded-3xl"
        />
        {errors.phone && <p className="bg-red-500 w-fit px-2 rounded-lg shadow-md text-white mx-2 mt-[3px]">{errors.phone}</p>}
      </div>
      <div className='flex mt-4 space-x-2'>
        <button type="submit" className="bg-green-400 shadow-md w-44 py-2 rounded-xl hover:bg-green-500">
          {editingContact ? 'Edit Contact' : ' Add Contact'}
        </button>
        <button type="button" onClick={onClose} className="bg-red-400 w-44 py-2 rounded-xl hover:bg-red-500">
          cancel
        </button>
      </div>
    </form>
  );
}

export default ContactForm;