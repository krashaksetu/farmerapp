import React, { createContext, useState, useCallback } from 'react';


export const CropContext = createContext();


export const CropProvider = ({ children }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);  

  
  const selectCrop = useCallback((crop) => {
    setSelectedCrop(crop);
  }, []);

  
  const clearSelectedCrop = useCallback(() => {
    setSelectedCrop(null);
  }, []);

  return (
    <CropContext.Provider value={{ selectedCrop, selectCrop, clearSelectedCrop }}>
      {children}
    </CropContext.Provider>
  );
};
