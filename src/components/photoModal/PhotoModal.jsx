import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import "./photoModal.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {API_BASE_URL} from '../../constants/constant';
import PropTypes from 'prop-types';
import useCloseModal from "../../hooks/useCloseModal";

const PhotoModal = ({ setOpenModal, path }) => {
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const {setUpdatedPhotos} = useGlobalContext();
  const isClosed = useCloseModal();

  const addImages = (files) => {
    for (let index = 0; index < files.length; index++) {
      if (files[index].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[index].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[index].name,
            url: URL.createObjectURL(files[index]),
            file: files[index],
          },
        ]);
      }
    }
  };

  const selectImages = (e) => {
    const files = e.target.files;
    addImages(files);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    addImages(files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const deleteImage = (idx) => {
    setImages((img) => img.filter((_, i) => i !== idx));
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setUpdatedPhotos(false);
    setErrorMsg(null);

    const formData = new FormData();
    images.forEach((img, index) => {
      formData.append(`image${index + 1}`, img.file);
    });

    const option = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${path}`, option);
      if (response.status === 200 || response.status === 201) {
        const result = await response.json();
        console.log("Images uploaded:", result);
        setUpdatedPhotos(true);
        setOpenModal(false);
      } else if (response.status === 400) {
        setErrorMsg("Invalid request");
        throw new Error("Invalid request - file not found.");
      } else if (response.status === 404) {
        setErrorMsg("Gallery not found.");
        throw new Error("Gallery not found.");
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error(error.message);
    }
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
