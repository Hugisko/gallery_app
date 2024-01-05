import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {API_BASE_URL} from '../constants/constant';
import { useGlobalContext } from "./useGlobalContext";

const useDelete = (type) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setUpdatedGallery, activeGallery, setUpdatedPhotos, activeImg } = useGlobalContext();

  useEffect(() => {
    const deleteImageOrGallery = async () => {
      setUpdatedPhotos(false);
      const path = type === "gallery" ? activeGallery.path : activeImg.fullpath;
      try {
        const response = await fetch(`${API_BASE_URL}/gallery/${path}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          console.log("Gallery or photo deleted");
          if (type === "gallery") {
            setUpdatedGallery(true);
          } else {
            setUpdatedPhotos(true);
          }
          setIsDeleting(false);
        } else if (response.status === 404) {
          throw new Error("Gallery or photo does not exist");
        } else {
          throw new Error("Unknown error");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    
    if (isDeleting) {
      deleteImageOrGallery();
    }
  }, [isDeleting,activeImg,activeGallery,setUpdatedGallery,type,setUpdatedPhotos]);

  return setIsDeleting;
};

useDelete.propTypes = {
  type: PropTypes.string,
};

export default useDelete;
