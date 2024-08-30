import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';

function PictureUpload({ previewUrl, onChange, onRemove }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
                <input
                    className="hidden"
                    type="file"
                    onChange={onChange}
                    name="picture"
                    id="picture"
                    accept="image/*"
                />
                <label htmlFor="picture" className="cursor-pointer block w-full h-full rounded-full overflow-hidden bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <FontAwesomeIcon icon={faUser} className="h-16 w-16" />
                        </div>
                    )}
                </label>
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer shadow-lg">
                    <FontAwesomeIcon icon={faCamera} className="h-4 w-4 text-white" />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="picture" className="text-white font-semibold cursor-pointer">
                    {previewUrl ? 'Change Photo' : 'Add Photo'}
                </label>
                {previewUrl && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default PictureUpload;
