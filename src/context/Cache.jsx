import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CacheContext = createContext(null);

const CacheProvider = ({ children }) => {
  const [galleryCache, setGalleryCache] = useState([]);

  const addGalleryToCache = (galleryName, images) => {
    if(getGalleryFromCache(galleryName)){
      return;
    }
    setGalleryCache((prevCache) => [
      ...prevCache,
      { galleryName, images },
    ]);
  };

  const getGalleryFromCache = (galleryName) => {
    return galleryCache.find((gallery) => gallery.galleryName === galleryName);
  };

  const findGalleryIndex = (galleryArray, galleryName) => {
    return galleryArray.findIndex((gallery) => gallery.galleryName === galleryName);
  };

  const updateGalleryCache = (galleryName, images) => {
    const galleryIndex = findGalleryIndex(galleryCache, galleryName);
    if (galleryIndex !== -1) {
      const updatedGalleries = [...galleryCache];
      updatedGalleries[galleryIndex].images = images;
      setGalleryCache(updatedGalleries);
    }
  }

  return (
    <CacheContext.Provider
      value={{ addGalleryToCache, getGalleryFromCache, updateGalleryCache }}
    >
      {children}
    </CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PropTypes.any
};

export {CacheContext, CacheProvider};