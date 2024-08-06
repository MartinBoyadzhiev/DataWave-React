import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="language-switcher">
      <select onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="bg">Български</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;