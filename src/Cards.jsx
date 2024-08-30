import React from "react";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cards({ contacts, onEdit, onDelete }) {
    return (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {contacts.map((contact, index) => (
                <div key={index} className="flex transition-all items-center justify-between px-4 w-[400px] py-2.5 bg-black/20 rounded-md shadow-black/20 shadow-lg border border-black/30 hover:bg-black/50 max-sm:flex-col">
                    <div className="flex gap-4 items-center max-sm:flex-col">
                        <div className="w-16 h-16 bg-white rounded-full border transition-transform hover:scale-125">
                            {contact.picture && contact.picture instanceof File ? (
                                <img src={URL.createObjectURL(contact.picture)} alt="Contact" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center rounded-full justify-center text-white">
                                    <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
                                </div>
                            )}
                        </div>
                        <div className="text-white max-sm:text-center">
                            <div className="text-xl font-semibold capitalize">{contact.name} {contact.lastName}</div>
                            <div className="text-sm">{contact.email}</div>
                            <div className="text-sm">{contact.phoneNumber}</div>
                        </div>
                    </div>
                    <div className="flex max-sm:flex-col-none">
                        <button className="bg-white/30 transition-all px-2 py-1 rounded-md shadow-md border border-black/45 hover:bg-red-400" onClick={() => onDelete(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="bg-white/30 px-2 py-1 transition-all rounded-md shadow-md border border-black/45 hover:bg-blue-400" onClick={() => onEdit(index)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
