import "./card.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import PropTypes from "prop-types";
import ProgressiveImage from "../../utils/ProgressiveImage";

const Card = ({
  isCategory,
  title,
  photo,
  total,
  setshowPhotoModal,
  setOpenDeleteModal,
  activeCategory,
  isLoading
}) => {
  const { setActiveGallery, setActiveImg } = useGlobalContext();

  const handleClickImage = () => {
    setshowPhotoModal(true);
    setActiveImg(photo);
  };

  const handleDeleteImage = () => {
    setOpenDeleteModal(true);
    setActiveImg(photo);
  };

  const handleDeleteGallery = () => {
    setOpenDeleteModal(true);
    setActiveGallery(activeCategory);
  };

  return (
    <>
      {isCategory ? (
        <div
          className="categoryCard card"
          onClick={() => setActiveGallery(activeCategory)}
        >
          <span>
            {total}{" "}
            {total === 1
              ? "fotka"
              : total > 1 && total < 5
              ? "fotky"
              : "fotiek"}
          </span>
          <Link to={`photos/${activeCategory.path}`}>
            {photo !== null ? (
              <ProgressiveImage src={photo} alt={activeCategory.name} loading={isLoading} handleClickImage={null}/>
            ) : (
              <div className="empty grid-center">
                <AiOutlineStop />
              </div>
            )}
          </Link>
          <button className="deleteBtn" onClick={handleDeleteGallery}>
            <FaRegTrashCan />
          </button>
          <div className="categoryCard__name grid-center">{title}</div>
        </div>
      ) : (
        <div className="photoCard card grid-center">
            <ProgressiveImage src={photo.url} alt={photo.fullpath} loading={photo.loading} handleClickImage={handleClickImage}/>
            <button className="deleteBtn" onClick={handleDeleteImage}>
              <FaRegTrashCan />
            </button>
        </div>
      )}
    </>
  );
};

Card.propTypes = {
  isCategory: PropTypes.bool,
  title: PropTypes.string,
  photo: PropTypes.any,
  total: PropTypes.number,
  setshowPhotoModal: PropTypes.func,
  setOpenDeleteModal: PropTypes.func,
  activeCategory: PropTypes.object,
  isLoading: PropTypes.bool
};

export default Card;
