import "./photoSlider.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../context/Context";

const PhotoSlider = ({ setshowPhotoModal }) => {
  const { idxImage, setIdxImage, images } = useGlobalContext();

  const slideFunction = (direction) => {
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
  };

  return (
    <div className="overlay">
      <div className="slide__container">
        <button className="closeBtn" onClick={() => setshowPhotoModal(false)}>
          <IoMdClose />
        </button>
        <img src={images[idxImage].url} alt={images[idxImage].url} />
        {images.length > 1 && (
          <>
            <div className="prev" onClick={() => slideFunction("prev")}>
              <IoIosArrowRoundBack />
            </div>
            <div className="next" onClick={() => slideFunction("next")}>
              <IoIosArrowRoundForward />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoSlider;
