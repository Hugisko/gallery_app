import AddCard from "./../addCard/AddCard";
import Card from "./../card/Card";
import PropTypes from "prop-types";

const Photos = ({
  setOpenModal,
  setshowPhotoModal,
  setOpenDeleteModal,
  images,
}) => {

  return (
    <div className="photos container">
      {images.length > 0 && images.map((photo, idx) => {
          return (
            <Card
              key={idx}
              isCategory={false}
              photo={photo}
              setshowPhotoModal={setshowPhotoModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          );
        })}
      <AddCard setOpenModal={setOpenModal} title="Pridať fotky" />
    </div>
  );
};

Photos.propTypes = {
  setOpenModal: PropTypes.func,
  setshowPhotoModal: PropTypes.func,
  setOpenDeleteModal: PropTypes.func,
  images: PropTypes.array
};

export default Photos;
