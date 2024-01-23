import "./photoSlider.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useEffect} from "react";
import useCloseModal from "../../hooks/useCloseModal";
import useSlider from "../../hooks/useSlider";

const PhotoSlider = ({ setshowPhotoModal, images }) => {
  const isClosed = useCloseModal();
  const {idxImage,slideFunction} = useSlider(images);
  
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
        >
          <IoMdClose />
        </a>
        <img src={images[idxImage].url} alt={images[idxImage].fullpath} />
        {images.length > 1 && (
          <>
            <a
              className="prev"
              onClick={() => slideFunction("prev")}
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
