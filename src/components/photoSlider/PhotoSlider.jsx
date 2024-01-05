import "./photoSlider.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import useCloseModal from "../../hooks/useCloseModal";

const PhotoSlider = ({ setshowPhotoModal, images }) => {
  const { activeImg } = useGlobalContext();
  const isClosed = useCloseModal();
  const [idxImage, setIdxImage] = useState(activeImg.id);
  
  const slideFunction = useCallback((direction) => {
    const length = images.length;
    if (direction === "next") {
      let nextIdx = idxImage + 1;
      if (nextIdx === length) {
        nextIdx = 0;
      }
      setIdxImage(nextIdx);
    } else {
      let nextIdx = idxImage - 1;
      if (nextIdx < 0) {
        nextIdx = length - 1;
      }
      setIdxImage(nextIdx);
    }
  },[idxImage, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        slideFunction("next");
      } else if (e.key === "ArrowLeft") {
        slideFunction("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idxImage, slideFunction]);

  useEffect(()=>{
    if (isClosed) {
      setshowPhotoModal(false);
    }
  },[isClosed,setshowPhotoModal])

  return (
    <div className="overlay">
      <div className="slide__container">
        <a
          className="closeBtn"
          onClick={() => setshowPhotoModal(false)}
          tabIndex="0"
        >
          <IoMdClose />
        </a>
        <img src={images[idxImage].url} alt={images[idxImage].fullpath} />
        {images.length > 1 && (
          <>
            <a
              className="prev"
              onClick={() => slideFunction("prev")}
              tabIndex="0"
            >
              <IoIosArrowRoundBack />
            </a>
            <a
              className="next"
              onClick={() => slideFunction("next")}
            >
              <IoIosArrowRoundForward />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

PhotoSlider.propTypes = {
  setshowPhotoModal: PropTypes.func,
  images: PropTypes.array,
};

export default PhotoSlider;
