export const validateName = (name) => {
    if (!name.trim()) {
        return "Name is required";
    }
    return "";
};

export const validateLastName = (lastName) => {
    if (!lastName.trim()) {
        return "Last name is required";
    }
    return "";
};

export const validateEmail = (email) => {
    if (!email.trim()) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email address is invalid";
    }
    return "";
};

export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber.trim()) {
        return "Phone number is required";
    } else if (!/^\d+$/.test(phoneNumber)) {
        return "Phone number should contain only digits";
    }
    return "";
};

export const validateForm = (form) => {
    const errors = {};
    errors.name = validateName(form.name);
    errors.lastName = validateLastName(form.lastName);
    errors.email = validateEmail(form.email);
    errors.phoneNumber = validatePhoneNumber(form.phoneNumber);
    return errors;
};
