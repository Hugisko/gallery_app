import { useCallback, useEffect, useState } from "react";
import "./categoryModal.css";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {API_BASE_URL} from '../../constants/constant';
import PropTypes from 'prop-types';
import useCloseModal from "../../hooks/useCloseModal";

const CategoryModal = ({ setOpenModal }) => {
  const [galleryName, setGalleryName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { setUpdatedGallery } = useGlobalContext();
  const isClosed = useCloseModal();

  const handleCreateGallery = (e) => {
    e.preventDefault();
    setUpdatedGallery(false);
    setErrorMsg(null);

    createGallery();
  };

  const handleCloseBtn = useCallback(() => {
    setOpenModal(false);
    setErrorMsg(null);
  }, [setOpenModal]);

  const createGallery = async () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: galleryName,
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, option);
      if (response.status === 201) {
        const result = await response.json();
        console.log("Gallery created:", result);
        setOpenModal(false);
        setUpdatedGallery(true);
      } else if (response.status === 400) {
        const result = await response.json();
        setErrorMsg("Invalid request");
        throw new Error(result.description);
      } else if (response.status === 409) {
        setErrorMsg("Gallery with this name already exists");
        throw new Error("Gallery with this name already exists");
      } else {
        setErrorMsg("Unknown error");
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(()=>{
    if(isClosed){
      handleCloseBtn();
    }
  },[isClosed, handleCloseBtn])

  return (
    <div className="overlay">
      <div className="categoryModal__container addModal__container">
        <div className="categoryModal addModal">
          <div className="addModal__title">
            <p>Pridať kategóriu</p>
            <button className="closeBtn" onClick={handleCloseBtn}>
              <IoMdClose />
            </button>
          </div>
          <form action="">
            {errorMsg && <div className="errorMsg">{errorMsg}</div>}
            <div className="categoryModal__input">
              <span>Názov kategórie *</span>
              <input
                type="text"
                onChange={(e) => setGalleryName(e.target.value)}
              />
            </div>
            <button
              className="addBtn"
              type="submit"
              onClick={handleCreateGallery}
            >
              Pridať
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CategoryModal.propTypes = {
  setOpenModal: PropTypes.func,
};

export default CategoryModal;
