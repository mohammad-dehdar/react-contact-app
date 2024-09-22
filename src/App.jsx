import React from 'react';
import { ContactProvider } from './context/ContactContext';
import ContactManager from './components/ContactManager';

function App() {
  return (
    <ContactProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Contact App</h1>
        <ContactManager />
      </div>
    </ContactProvider>
  );
}

export default App;