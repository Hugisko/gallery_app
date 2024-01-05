import { useEffect, useState } from "react";
import Categories from "./../../components/categories/Categories";
import CategoryModal from "./../../components/categoryModal/CategoryModal";
import "./homepage.css";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Loading from "../../components/loading/Loading";
import useDelete from "../../hooks/useDelete";
import { API_BASE_URL } from '../../constants/constant.js'
import { useGlobalContext } from "../../hooks/useGlobalContext";

const Homepage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [isGalleryFetched, setIsGalleryFetched] = useState(false);
  const [galleryItem, setGalleryItem] = useState([]);
  const [photoUrl, setPhotoUrl] = useState({});

  const { updatedGallery, activeGallery, setUpdatedGallery } = useGlobalContext();
  const setIsDeleting = useDelete("gallery");

  useEffect(() => {
    setIsGalleryFetched(false);
    setUpdatedGallery(false);
    setIsDeleting(false);
    const fetchGalleryList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery`);
        if (response.status === 200) {
          const data = await response.json();
          setGalleryList(data.galleries);
          setIsGalleryFetched(true);
        } else {
          throw new Error("Unknown error");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchGalleryList();
  }, [updatedGallery]);

  useEffect(() => {
    const fetchGalleryItem = async (path) => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery/${path}`);
        if (response.status === 200) {
          const data = await response.json();
          setGalleryItem((prevData) => [...prevData, data]);
        } else if (response.status === 404) {
          throw new Error(`Gallery does not exists: ${path}`);
        } else {
          throw new Error("Unknown error occurred");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchPhotoPreview = async (path) => {
      try {
        const response = await fetch(`${API_BASE_URL}/images/0x0/${path}`);
        if (response.status === 200) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setPhotoUrl((prevImage) => ({
            ...prevImage,
            [path]: objectUrl,
          }));
        } else if (response.status === 404) {
          throw new Error("Photo not found");
        } else if (response.status === 500) {
          throw new Error("The photo preview can't be generated");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (isGalleryFetched) {
      galleryList.forEach((gallery) => {
        fetchGalleryItem(gallery.path);
        if (Object.hasOwnProperty.call(gallery, "image")) {
          fetchPhotoPreview(gallery.image.fullpath);
        }
      });
    }
  }, [isGalleryFetched]);

  return (
    <div>
      <h2 className="subtitle">Kategórie</h2>
      {galleryItem ? (
        <Categories
          setOpenModal={setOpenModal}
          setOpenDeleteModal={setOpenDeleteModal}
          galleryList={galleryList}
          galleryItem={galleryItem}
          photoUrl={photoUrl}
        />
      ) : (
        <Loading />
      )}

      {openModal && <CategoryModal setOpenModal={setOpenModal} />}
      {openDeleteModal && (
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          setIsDeleting={setIsDeleting}
          title={`Naozaj chcete vymazať ${activeGallery.name} galériu?`}
        />
      )}
    </div>
  );
};

export default Homepage;
