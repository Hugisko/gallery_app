import React from "react";
import "./deleteModal.css";
import { useGlobalContext } from "../../context/Context";

const DeleteModal = ({ setOpenDeleteModal, type }) => {
  const {
    setUpdatedGallery,
    activeGallery,
    setUpdatedPhotos,
    activeImg,
    API_BASE_URL,
  } = useGlobalContext();

  const deleteImageOrGallery = async (path) => {
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
        setOpenDeleteModal(false);
      } else if (response.status === 404) {
        throw new Error("Gallery or photo does not exist");
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteBtn = (e) => {
    e.preventDefault();
    let path;

    if (type === "gallery") {
      path = activeGallery.path;
      setUpdatedGallery(false);
    } else {
      path = activeImg.path;
      setUpdatedPhotos(false);
    }

    deleteImageOrGallery(path);
  };

  return (
    <div className="overlay">
      <div className="deleteModal">
        <form action="">
          <h2>{`${
            type === "gallery"
              ? `Naozaj chcete vymazať ${activeGallery.name} galériu?`
              : "Naozaj chcete vymazať túto fotografiu?"
          }`}</h2>
          <div className="btn__container flex-center-row">
            <button type="submit" onClick={handleDeleteBtn}>
              áno
            </button>
            <button type="button" onClick={() => setOpenDeleteModal(false)}>
              nie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
