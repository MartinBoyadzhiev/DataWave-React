// src/components/ConfirmationDialog.jsx
import React from 'react';
import './ConfirmationDialog.css';
import { useTranslation } from 'react-i18next';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    const { t } = useTranslation();
    return (
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
                <p>{message}</p>
                <div className="confirmation-dialog-actions">
                    <button className="confirm-button" onClick={onConfirm}>{t('confirm')}</button>
                    <button className="cancel-button" onClick={onCancel}>{t('deny')}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;