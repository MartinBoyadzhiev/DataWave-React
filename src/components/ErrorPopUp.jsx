import React from 'react';
import './ErrorPopUp.css';
import { useTranslation } from 'react-i18next';

const ErrorPopup = ({ message, onClose }) => {
    const { t } = useTranslation();
    const formattedMessage = t(message).replace(/\n/g, '<br />');

    return (
        <div className="error-popup">
            <div className="error-popup-content">
                <p dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>
                <button className="close-button" onClick={onClose}>{t('back')}</button>
            </div>
        </div>
    );
};

export default ErrorPopup;