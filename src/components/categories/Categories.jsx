import AddCard from "./../addCard/AddCard";
import Card from "./../card/Card";
import PropTypes from "prop-types";

const Categories = ({ setOpenModal, setOpenDeleteModal, galleryList, galleryItem, photoUrl }) => {

  return (
    <div className="categories container">
      {galleryList.map((item) => {
        let inList = false;
        let total = 0;
        let galleryPath = null;
        galleryItem.forEach((img) => {
          if (item.name === img.gallery.name) {
            inList = true;
            total = img.images.length;
            galleryPath = img.gallery;
            return;
          }
        });
        if (inList) {
          let imgGallery = null;
          if (Object.hasOwnProperty.call(item,"image")) {
            imgGallery = photoUrl[item.image.fullpath];
          }
          return (
            <Card
              isCategory={true}
              key={item.name}
              title={item.name}
              photo={imgGallery}
              total={total}
              setOpenDeleteModal={setOpenDeleteModal}
              activeCategory={galleryPath}
            />
          );
        }
      })}
      <AddCard setOpenModal={setOpenModal} title="Pridať kategóriu" />
    </div>
  );
};

Categories.propTypes = {
  setOpenModal: PropTypes.func,
  setOpenDeleteModal: PropTypes.func,
  galleryList: PropTypes.array, 
  galleryItem: PropTypes.array, 
  photoUrl: PropTypes.object
};

export default Categories;
