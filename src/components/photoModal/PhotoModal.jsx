import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import "./photoModal.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import PropTypes from 'prop-types';
import useCloseModal from "../../hooks/useCloseModal";
import useCreatePhoto from "../../hooks/useCreatePhoto";
import useHandleImages from "../../hooks/useHandleImages";

const PhotoModal = ({ setOpenModal, path }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const {setUpdatedPhotos} = useGlobalContext();
  const isClosed = useCloseModal();
  const {images,setImages,selectImages,onDragOver,onDragLeave,onDrop} = useHandleImages();
  const setIsCreating = useCreatePhoto(images,setUpdatedPhotos,setOpenModal,setErrorMsg,path);

  const deleteImage = (idx) => {
    setImages((img) => img.filter((_, i) => i !== idx));
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setUpdatedPhotos(false);
    setErrorMsg(null);
    setIsCreating(true);
  };

  useEffect(()=>{
    if(isClosed){
      setOpenModal(false);
    }
  },[isClosed,setOpenModal])

  return (
    <div className="overlay">
      <div className="photoModal__container addModal__container">
        <div className="photoModal addModal">
          <div className="addModal__title">
            <p>Pridať fotky</p>
            <button className="closeBtn" onClick={() => setOpenModal(false)}>
              <IoMdClose />
            </button>
          </div>
          <form action="" className="form">
            <div
              className="drag-area grid-center"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <CiImageOn />
              <p>Sem presuňte fotky</p>
              <span>alebo</span>
              <label htmlFor="files" className="custom-button grid-center">
                Vyberte súbory
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                id="files"
                onChange={selectImages}
              />
            </div>
            <div className="image__container">
              {images.map((img, idx) => (
                <div className="image" key={idx}>
                  <span className="deleteBtn" onClick={() => deleteImage(idx)}>
                    <IoMdClose />
                  </span>
                  <img src={img.url} alt={img.name} />
                </div>
              ))}
            </div>
            {errorMsg && <div className="errorMsg">{errorMsg}</div>}
            <button type="submit" className="addBtn" onClick={handleAddImage}>
              Pridať
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PhotoModal.propTypes = {
  setOpenModal: PropTypes.func,
  path: PropTypes.string
};

export default PhotoModal;
