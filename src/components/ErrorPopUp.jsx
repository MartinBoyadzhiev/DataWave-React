import React from 'react';
import './ErrorPopUp.css';

const ErrorPopup = ({ message, onClose }) => {
    const formattedMessage = message.replace(/\n/g, '<br />');

    return (
        <div className="error-popup">
            <div className="error-popup-content">
                <p dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>
                <button className="close-button" onClick={onClose}>Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPopup;