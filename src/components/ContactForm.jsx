import { useState, useEffect } from 'react';
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
    // Clear the error for this field when the user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = 'Phone number should be 10 or 11 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = editingContact
          ? `http://localhost:3000/contacts/${editingContact.id}`
          : 'http://localhost:3000/contacts';
        const method = editingContact ? axios.put : axios.post;
        const response = await method(url, formData);
        dispatch({
          type: editingContact ? 'UPDATE_CONTACT' : 'ADD_CONTACT',
          payload: response.data
        });
        onClose();
      } catch (error) {
        console.error('Error saving contact:', error);
        alert('Failed to save contact. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transition-all mb-4 bg-white shadow-md border border-slate-200 rounded-3xl p-4">
      {['firstName', 'lastName', 'email', 'phone'].map((field) => (
        <div key={field} className="mb-2">
          <input
            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' name')}
            className="w-full shadow-md p-2 border border-slate-200 bg-transparent focus:outline-none focus:border-slate-400 rounded-3xl"
          />
          {errors[field] && <p className="bg-red-500 w-fit px-2 rounded-lg shadow-md text-white mx-2 mt-[3px]">{errors[field]}</p>}
        </div>
      ))}
      <div className='flex mt-4 space-x-2'>
        <button type="submit" className="bg-green-400 shadow-md w-44 py-2 rounded-xl hover:bg-green-500">
          {editingContact ? 'Edit Contact' : 'Add Contact'}
        </button>
        <button type="button" onClick={onClose} className="bg-red-400 w-44 py-2 rounded-xl hover:bg-red-500">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ContactForm;