import { useState, useContext, useEffect, createContext } from "react";

const AppContext = createContext();

const API_BASE_URL = "http://api.programator.sk/";

const AppProvider = ({ children }) => {
  const [galleryList, setGalleryList] = useState([]);
  const [gallery, setGallery] = useState(null);
  const [galleryItem, setGalleryItem] = useState([]);
  const [photoUrl, setPhotoUrl] = useState({});
  const [images, setImages] = useState([]);
  const [galleryFetched, setGalleryFetched] = useState(false);
  const [imagesFetched, setImagesFetched] = useState(false);
  const [idxImage, setIdxImage] = useState(-1);
  const [updatedGallery, setUpdatedGallery] = useState(false);
  const [updatedPhotos, setUpdatedPhotos] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const abortController = new AbortController();

  const fetchGalleryList = async () => {
    setGalleryFetched(false);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`);
      if (response.status === 200) {
        const data = await response.json();
        setGalleryList(data.galleries);
        setGalleryFetched(true);
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchGallery = async (path) => {
    setGalleryFetched(false);
    setImagesFetched(false);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${path}`);
      if (response.status === 200) {
        const data = await response.json();
        setGallery(data);
        setGalleryFetched(true);
      } else if (response.status === 404) {
        throw new Error(`Gallery does not exists: ${path}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchGalleryItem = async (path) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${path}`);
      if (response.status === 200) {
        const data = await response.json();
        setGalleryItem((prevData) => [...prevData, data]);
      } else if (response.status === 404) {
        throw new Error(`Gallery does not exists: ${path}`);
      } else {
        throw new Error("Unknown error occurred");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchPhotoPreview = async (path) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/0x0/${path}`);
      if (response.status === 200) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPhotoUrl((prevImage) => ({
          ...prevImage,
          [path]: objectUrl,
        }));
      } else if (response.status === 404) {
        throw new Error("Photo not found");
      } else if (response.status === 500) {
        throw new Error("The photo preview can't be generated");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchAllImages = async () => {
    const imagePromises = gallery.images.map(async (img) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/images/0x0/${img.fullpath}`,
          { signal: abortController.signal }
        );
        if (response.status === 200) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          return { path: img.fullpath, url: objectUrl };
        } else if (response.status === 404) {
          throw new Error("Photo not found");
        } else if (response.status === 500) {
          throw new Error("The photo preview can't be generated");
        }
      } catch (error) {
        console.error(error.message);
        return null;
      }
    });

    try {
      const resolvedImages = await Promise.all(imagePromises);
      const filteredImages = resolvedImages.filter((img) => img !== null);
      setImages(filteredImages);
      if (filteredImages.length === gallery.images.length) {
        setImagesFetched(true);
      }
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        galleryList,
        fetchGallery,
        gallery,
        galleryItem,
        photoUrl,
        setIdxImage,
        idxImage,
        galleryFetched,
        fetchGalleryItem,
        fetchGalleryList,
        fetchPhotoPreview,
        updatedGallery,
        setUpdatedGallery,
        activeGallery,
        setActiveGallery,
        setGalleryItem,
        updatedPhotos,
        setUpdatedPhotos,
        activeImg,
        setActiveImg,
        errorMsg,
        setErrorMsg,
        abortController,
        fetchAllImages,
        images,
        imagesFetched,
        setImagesFetched,
        API_BASE_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
