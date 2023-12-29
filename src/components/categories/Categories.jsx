import AddCard from "./../addCard/AddCard";
import Card from "./../card/Card";
import { useGlobalContext } from "../../context/Context";

const Categories = ({ setOpenModal, setOpenDeleteModal }) => {
  const { galleryList, galleryItem, photoUrl } = useGlobalContext();

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
          if (item.hasOwnProperty("image")) {
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
              activeCard={galleryPath}
            />
          );
        }
      })}
      <AddCard setOpenModal={setOpenModal} title="Pridať kategóriu" />
    </div>
  );
}

export default Categories;
