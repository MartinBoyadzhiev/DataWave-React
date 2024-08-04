import React, { createContext, useState, useContext } from 'react';

const AccessControlContext = createContext();

export const AccessControlProvider = ({ children }) => {
  const [canAccessData, setCanAccessData] = useState(false);

  return (
    <AccessControlContext.Provider value={{ canAccessData, setCanAccessData }}>
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = () => useContext(AccessControlContext);