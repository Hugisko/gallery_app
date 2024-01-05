import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Photos from "./../../components/photos/Photos";
import "./photopage.css";
import PhotoModal from "./../../components/photoModal/PhotoModal";
import PhotoSlider from "../../components/photoSlider/PhotoSlider";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { useParams } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import { API_BASE_URL } from "../../constants/constant";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useCache } from "../../hooks/useCache";

const Photopage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showPhotoModal, setshowPhotoModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [isGalleryFetched, setIsGalleryFetched] = useState(false);
  const abortController = useMemo(() => new AbortController(), []);

  const { updatedPhotos, setUpdatedPhotos } = useGlobalContext();
  const { addGalleryToCache, getGalleryFromCache, updateGalleryCache } = useCache();
  const setIsDeleting = useDelete("image");

  const { id } = useParams();

  useEffect(() => {
    const fetchGallery = async (path) => {
      const cachedGallery = getGalleryFromCache(id);
      if(cachedGallery && !updatedPhotos){
        setImages(cachedGallery.images);
      }else{
        setIsGalleryFetched(false);
        setIsDeleting(false);
        try {
          const response = await fetch(`${API_BASE_URL}/gallery/${path}`);
          if (response.status === 200) {
            const data = await response.json();
            data.images.forEach((item, idx) => {
              setImages((prev) => [
                ...prev,
                { loading: true, url: null, fullpath: item.fullpath, id: idx },
              ]);
            }); 
            setGallery(data);
            setIsGalleryFetched(true);  
          } else if (response.status === 404) {
            throw new Error(`Gallery does not exists: ${path}`);
          } else {
            throw new Error("Unknown error occurred");
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchGallery(id);

    return () => {
      abortController.abort();
      setImages([]);
      setGallery([]);
    };
  }, [id,updatedPhotos]);

  useEffect(() => {
    const fetchImage = async (path, index) => {
      try {
        const response = await fetch(`${API_BASE_URL}/images/0x0/${path}`);
        if (response.status === 200) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);      
          const newList = [...images];
          newList[index].loading = false;
          newList[index].url = objectUrl;
          setImages(newList);
          if(index === gallery.images.length - 1){
            if(updatedPhotos){
              updateGalleryCache(id,newList);
              setUpdatedPhotos(false);
            }else{
              addGalleryToCache(id,newList);
            }       
          }
        } else if (response.status === 404) {
          throw new Error("Photo not found");
        } else if (response.status === 500) {
          throw new Error("The photo preview can't be generated");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (isGalleryFetched) {
      if(gallery.images.length === 0){
        if(getGalleryFromCache() === undefined){
          addGalleryToCache(id,[]);
        }else{
          updateGalleryCache(id,[]);
        }
      }

      gallery.images.forEach((image, idx) => {
        fetchImage(image.fullpath, idx);
      });
    }

    return () => {
      abortController.abort();
    };
  }, [isGalleryFetched,abortController]);

  return (
    <div className="photopage">
      <Link to={"/"}>
        <FaArrowLeft />
        <h2>{id}</h2>
      </Link>
      <Photos
        setOpenModal={setOpenModal}
        setshowPhotoModal={setshowPhotoModal}
        setOpenDeleteModal={setOpenDeleteModal}
        images={images}
      />
      {openModal && <PhotoModal setOpenModal={setOpenModal} path={id} />}
      {showPhotoModal && (
        <PhotoSlider setshowPhotoModal={setshowPhotoModal} images={images} />
      )}
      {openDeleteModal && (
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          setIsDeleting={setIsDeleting}
          title={"Naozaj chcete vymazať túto fotografiu?"}
        />
      )}
    </div>
  );
};

export default Photopage;
