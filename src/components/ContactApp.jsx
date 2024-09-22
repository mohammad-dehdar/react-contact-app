import { ContactProvider } from '../context/ContactContext';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const ContactApp = () => {
  return (
    <ContactProvider>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Contact App</h1>
        <ContactForm />
        <ContactList />
      </div>
    </ContactProvider>
  );
};

export default ContactApp;