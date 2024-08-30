import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import PictureUpload from "./PictureUpload";
import FormActions from "./FormActions";
import { validateForm } from "./utils/validation";

function Form({ onClose, onAddContact, contact }) {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        picture: null,
    });

    const [errors, setErrors] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (contact) {
            setForm(contact);
            if (contact.picture && contact.picture instanceof File) {
                setPreviewUrl(URL.createObjectURL(contact.picture));
            } else if (contact.picture && typeof contact.picture === "string") {
                setPreviewUrl(contact.picture);
            }
        }
        return () => {
            if (previewUrl && previewUrl instanceof Blob) URL.revokeObjectURL(previewUrl);
        };
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).some(key => validationErrors[key])) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            onAddContact(form);
            setForm({ name: "", lastName: "", email: "", phoneNumber: "", picture: null });
            if (previewUrl && previewUrl instanceof Blob) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
            onClose();
        }
    };

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture' && files && files[0]) {
            const file = files[0];
            setForm(prevForm => ({ ...prevForm, picture: file }));
            if (previewUrl && previewUrl instanceof Blob) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    };

    const removePicture = () => {
        setForm(prevForm => ({ ...prevForm, picture: null }));
        if (previewUrl && previewUrl instanceof Blob) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 backdrop-filter backdrop-blur-lg bg-black/95 bg-opacity-10 rounded-3xl shadow-lg border border-white border-opacity-20">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <PictureUpload previewUrl={previewUrl} onChange={changeHandler} onRemove={removePicture} />
                    <div className="space-y-2">
                        <TextInput name="name" value={form.name} onChange={changeHandler} placeholder="First Name" error={errors.name} />
                        <TextInput name="lastName" value={form.lastName} onChange={changeHandler} placeholder="Last Name" error={errors.lastName} />
                        <TextInput name="email" value={form.email} onChange={changeHandler} placeholder="Email" error={errors.email} />
                        <TextInput name="phoneNumber" value={form.phoneNumber} onChange={changeHandler} placeholder="Phone Number" error={errors.phoneNumber} />
                    </div>
                    <FormActions onSubmit={handleSubmit} onClose={onClose} isUpdate={!!contact} />
                </form>
            </div>
        </div>
    );
}

export default Form;
