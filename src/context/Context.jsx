import { useState, createContext } from "react";
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [updatedGallery, setUpdatedGallery] = useState(false);
  const [updatedPhotos, setUpdatedPhotos] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeImg, setActiveImg] = useState(null);

  return (
    <AppContext.Provider
      value={{
        setUpdatedGallery,
        updatedGallery,
        activeGallery,
        setActiveGallery,
        updatedPhotos,
        setUpdatedPhotos,
        activeImg,
        setActiveImg
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any
};



export { AppProvider, AppContext };
