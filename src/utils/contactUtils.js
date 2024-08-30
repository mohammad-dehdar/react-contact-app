export const updateContact = (contacts, setContacts, selectedContact, contact) => {
    setContacts(prevContacts => 
        prevContacts.map((c, index) => index === selectedContact ? contact : c)
    );
};

export const addContact = (contacts, setContacts, contact) => {
    setContacts(prevContacts => [...prevContacts, contact]);
};

export const addOrUpdateContact = (contacts, setContacts, selectedContact, setSelectedContact, setShowForm, contact) => {
    if (selectedContact !== null) {
        updateContact(contacts, setContacts, selectedContact, contact);
    } else {
        addContact(contacts, setContacts, contact);
    }
    setSelectedContact(null);
    setShowForm(false);
};

export const editContact = (index, setSelectedContact, setShowForm) => {
    setSelectedContact(index);
    setShowForm(true);
};

export const deleteContact = (index, setContacts) => {
    setContacts(prevContacts => prevContacts.filter((_, i) => i !== index));
};
