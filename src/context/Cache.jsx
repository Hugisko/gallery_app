import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CacheContext = createContext(null);

const CacheProvider = ({ children }) => {
  const [galleryCache, setGalleryCache] = useState([]);
  const [categoryCache, setCategoryCache] = useState([]);
  const [categoryPhotoCache, setCategoryPhotoCache] = useState({});
  const [categoryListCache,setCategoryListCache] = useState([]);

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

  const addCategoryToCache = (category) => {
    setCategoryCache((prevCache) => [
      ...prevCache,
      category,
    ]);
  };

  const addCategoryPhotoToCache = (path,photo) => {
    setCategoryPhotoCache((prevCache) => ({
      ...prevCache,
      [path]: photo,
    }));
  };

  const addCategoryListToCache = (list) => {
    setCategoryListCache(list);
  };

  const resetCategories = () => {
    setCategoryCache([]);
    setCategoryListCache([]);
    setCategoryPhotoCache({});

  }

  return (
    <CacheContext.Provider
      value={{ addGalleryToCache, getGalleryFromCache, updateGalleryCache, addCategoryToCache, addCategoryPhotoToCache, categoryPhotoCache, categoryCache,categoryListCache, addCategoryListToCache, resetCategories}}
    >
      {children}
    </CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PropTypes.any
};

export {CacheContext, CacheProvider};