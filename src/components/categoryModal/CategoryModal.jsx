import { useCallback, useEffect, useState } from "react";
import "./categoryModal.css";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import PropTypes from 'prop-types';
import useCloseModal from "../../hooks/useCloseModal";
import useCreateCategory from "../../hooks/useCreateCategory";

const CategoryModal = ({ setOpenModal}) => {
  const [galleryName, setGalleryName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { setUpdatedGallery } = useGlobalContext();
  const isClosed = useCloseModal();
  const setIsCreating = useCreateCategory(galleryName, setOpenModal, setUpdatedGallery, setErrorMsg);

  const handleCreateGallery = (e) => {
    e.preventDefault();
    setUpdatedGallery(false);
    setErrorMsg(null);
    setIsCreating(true); 
  };

  const handleCloseBtn = useCallback(() => {
    setOpenModal(false);
    setErrorMsg(null);
  }, [setOpenModal]);

  
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
