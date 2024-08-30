import React, { useState, useEffect, useCallback } from "react";
import { faAddressBook, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "./Form";
import Cards from "./Cards";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/localStorageUtils";
import { filterContacts } from "./utils/filterUtils";
import { 
    addOrUpdateContact as handleAddOrUpdateContact, 
    editContact as handleEditContact, 
    deleteContact as handleDeleteContact 
} from "./utils/contactUtils";

function ContainerForm() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedContacts = loadFromLocalStorage("contacts");
        if (storedContacts) {
            setContacts(storedContacts);
        }
    }, []); 

    useEffect(() => {
        if (contacts.length > 0) {
            saveToLocalStorage("contacts", contacts);
        }
    }, [contacts]);

    const addOrUpdateContact = (contact) => {
        handleAddOrUpdateContact(contacts, setContacts, selectedContact, setSelectedContact, setShowForm, contact);
    };

    const editContact = useCallback((index) => {
        handleEditContact(index, setSelectedContact, setShowForm);
    }, []);

    const deleteContact = useCallback((index) => {
        handleDeleteContact(index, setContacts);
    }, []);

    const toggleForm = () => {
        setSelectedContact(null);
        setShowForm(prevShowForm => !prevShowForm);
    };

    const filteredContacts = filterContacts(contacts, searchTerm);

    return (
        <div>
            <div className="bg-primary text-primary-foreground py-4 px-6 backdrop-blur-md bg-primary/80 rounded-b-2xl shadow-lg flex justify-between items-center max-sm:flex max-sm:flex-col max-sm:gap-y-4">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faAddressBook} className="text-2xl" />
                    <h1 className="text-3xl font-bold">Contacts</h1>
                </div>
                <div className="flex items-center space-x-2 max-sm:flex-col">
                    <div className="flex space-x-2 py-2 px-2 rounded-xl items-center bg-primary-foreground/10 focus:outline focus:outline-black">
                        <FontAwesomeIcon icon={faSearch} className="bg-none" />
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Search contacts..."
                            className="bg-transparent border-none focus:outline-none max-sm:text-center"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search Contacts"
                        />
                    </div>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={`text-2xl hover:text-primary-foreground/50 transition-all cursor-pointer max-sm:mt-2 ${showForm ? 'text-primary-foreground/50' : ''}`}
                        onClick={toggleForm}
                        aria-label={showForm ? "Close Form" : "Add Contact"}
                    />
                </div>
            </div>
            <div>
                <Cards contacts={filteredContacts} onEdit={editContact} onDelete={deleteContact} />
            </div>
            {showForm && (
                <div className="fixed top-0 left-0 h-screen w-screen z-40 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn">
                    <Form
                        onClose={toggleForm}
                        onAddContact={addOrUpdateContact}
                        contact={selectedContact !== null ? contacts[selectedContact] : null}
                    />
                </div>
            )}
        </div>
    );
}

export default ContainerForm;
