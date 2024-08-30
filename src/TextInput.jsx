import React from "react";

function TextInput({ name, value, onChange, placeholder, error }) {
    return (
        <div>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border rounded-md ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

export default TextInput;
