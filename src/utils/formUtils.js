export const toggleFormVisibility = (showForm, setShowForm, setSelectedContact) => {
    setSelectedContact(null);
    setShowForm(prevShowForm => !prevShowForm);
};
