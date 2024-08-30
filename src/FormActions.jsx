import React from "react";

function FormActions({ onSubmit, onClose, isUpdate }) {
    return (
        <div className="flex items-center justify-between space-x-4 max-sm:*:text-sm max-sm:w-30">
            <button
                className="flex-1 px-4 py-2 shadow-md bg-blue-500 text-white rounded-lg hover:bg-blue-600/20 border border-white/45 focus:outline-none focus:ring-2 transition-colors duration-300"
                type="submit"
            >
                {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
            <button
                className="flex-1 px-4 py-2 bg-red-500 text-white shadow-md border border-white/45 rounded-lg hover:bg-red-600/20 focus:outline-none transition-colors duration-300"
                type="button"
                onClick={onClose}
            >
                Cancel
            </button>
        </div>
    );
}

export default FormActions;
