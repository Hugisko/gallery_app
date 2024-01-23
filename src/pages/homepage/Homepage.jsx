import { useEffect, useState } from "react";
import Categories from "./../../components/categories/Categories";
import CategoryModal from "./../../components/categoryModal/CategoryModal";
import "./homepage.css";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Loading from "../../components/loading/Loading";
import useDelete from "../../hooks/useDelete";
import { API_BASE_URL } from '../../constants/constant.js'
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useCache } from "../../hooks/useCache.jsx";

const Homepage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [isGalleryFetched, setIsGalleryFetched] = useState(false);
  const [galleryItem, setGalleryItem] = useState([]);
  const [photoUrl, setPhotoUrl] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const { updatedGallery, activeGallery, setUpdatedGallery} = useGlobalContext();
  const {addCategoryToCache, addCategoryPhotoToCache,categoryPhotoCache, resetCategories, categoryCache, addCategoryListToCache, categoryListCache} = useCache();
  const setIsDeleting = useDelete("gallery");

  useEffect(() => {
    setIsGalleryFetched(false);
    setUpdatedGallery(false);
    setIsDeleting(false);
    const fetchGalleryList = async () => {
      if(categoryCache.length > 0 && !updatedGallery){
        setIsloading(false);
        setGalleryList(categoryListCache);
        setGalleryItem(categoryCache);
        setPhotoUrl(categoryPhotoCache);
        return;
      }
      resetCategories();
      try {
        const response = await fetch(`${API_BASE_URL}/gallery`);
        if (response.status === 200) {
          const data = await response.json();
          addCategoryListToCache(data.galleries);
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
          addCategoryToCache(data);
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
          addCategoryPhotoToCache(path,objectUrl);
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
        fetchGalleryItem(gallery.path, gallery);
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
          isLoading={isLoading}
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
