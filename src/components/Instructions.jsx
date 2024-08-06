import React from 'react';
import './Instructions.css';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <div className="instructions-container">
      <h2>{t('instructions')}</h2>
      <ul>
        <li>{t('instruct1')}</li>
        <li>{t('instruct2')}</li>
        <li>{t('instruct3')}</li>
        <li>{t('instruct4')}</li>
        <li>{t('instruct5')}</li>
        <li>{t('instruct6')}</li>
        <li><Trans i18nKey='instruct7' components={{ 1: <br /> }} /></li>
      </ul>
    </div>
  );
};

export default Instructions;