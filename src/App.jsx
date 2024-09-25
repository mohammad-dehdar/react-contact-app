import React from 'react';
import { ContactProvider } from './context/ContactContext';
import ContactManager from './components/ContactManager';

function App() {
  return (
    <ContactProvider>
      <ContactManager />
    </ContactProvider>
  );
}

export default App;