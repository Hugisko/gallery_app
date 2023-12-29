import { useEffect, useState } from "react";
import Categories from "./../../components/categories/Categories";
import CategoryModal from "./../../components/categoryModal/CategoryModal";
import "./homepage.css";
import { useGlobalContext } from "../../context/Context";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    fetchGalleryList,
    updatedGallery,
    galleryFetched,
    fetchGalleryItem,
    fetchPhotoPreview,
    galleryList,
    galleryItem,
  } = useGlobalContext();

  useEffect(() => {
    fetchGalleryList();
  }, []);

  useEffect(() => {
    if (updatedGallery) {
      fetchGalleryList();
    }
  }, [updatedGallery]);

  useEffect(() => {
    if (galleryFetched) {    
      galleryList.forEach((gallery) => {
        fetchGalleryItem(gallery.path);
        if (gallery.hasOwnProperty("image")) {
          fetchPhotoPreview(gallery.image.fullpath);
        }
      });
    }
  }, [galleryList, galleryFetched]);

  return (
    <div>
      <h2 className="subtitle">Kategórie</h2>
      {galleryItem && galleryItem.length > 0 ? (
        <Categories
          setOpenModal={setOpenModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ) : (
        <Loading />
      )}

      {openModal && <CategoryModal setOpenModal={setOpenModal} />}
      {openDeleteModal && (
        <DeleteModal setOpenDeleteModal={setOpenDeleteModal} type="gallery" />
      )}
    </div>
  );
}

export default Home;
