import AddCard from "./../addCard/AddCard";
import Card from "./../card/Card";
import { useGlobalContext } from "../../context/Context";

const Photos = ({ setOpenModal, setshowPhotoModal, setOpenDeleteModal }) => {
  const { images} = useGlobalContext();

  return (
    <div className="photos container">
      {images.map((photo, idx) => {
        return (
          <Card
            key={idx}
            idx={idx}
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
}

export default Photos;
