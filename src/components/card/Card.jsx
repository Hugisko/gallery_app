import "./card.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";

const Card = ({
  isCategory,
  title,
  photo,
  total,
  setshowPhotoModal,
  idx,
  setOpenDeleteModal,
  activeCard,
}) => {
  const { setIdxImage, setActiveGallery, setActiveImg } = useGlobalContext();

  const handleClickImage = () => {
    setshowPhotoModal(true);
    setIdxImage(idx);
  };

  const handleDeleteImage = () => {
    setIdxImage(idx);
    setOpenDeleteModal(true);
    setActiveImg(photo);
  };

  const handleDeleteGallery = () => {
    setOpenDeleteModal(true);
    setActiveGallery(activeCard);
  };

  return (
    <>
      {isCategory ? (
        <div
          className="categoryCard card"
          onClick={() => setActiveGallery(activeCard)}
        >
          <span>
            {total}{" "}
            {total === 1
              ? "fotka"
              : total > 1 && total < 5
              ? "fotky"
              : "fotiek"}
          </span>
          <Link to={`photos/${activeCard.path}`}>
            {photo !== null ? (
              <img src={photo} alt={activeCard.name} />
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
        <div className="photoCard card">
          <img src={photo.url} alt={photo.name} onClick={handleClickImage} />
          <button className="deleteBtn" onClick={handleDeleteImage}>
            <FaRegTrashCan />
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
