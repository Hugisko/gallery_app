import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Photos from "./../../components/photos/Photos";
import "./photopage.css";
import PhotoModal from "./../../components/photoModal/PhotoModal";
import { useGlobalContext } from "./../../context/Context";
import PhotoSlider from "../../components/photoSlider/PhotoSlider";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Photopage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showPhotoModal, setshowPhotoModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    idxImage,
    updatedPhotos,
    fetchGallery,
    gallery,
    galleryFetched,
    abortController,
    fetchAllImages,
    imagesFetched,
    setImagesFetched,
  } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchGallery(id);
    return () => {
      abortController.abort();
      setImagesFetched(false);
    };
  }, [id, updatedPhotos]);

  useEffect(() => {
    if (gallery && galleryFetched) {
      if (gallery.images && gallery.images.length > 0) {
        fetchAllImages();
      } else {
        setImagesFetched(true);
      }
    }
    return () => {
      abortController.abort();
      setImagesFetched(false);
    };
  }, [galleryFetched, gallery]);

  return (
    <div className="photopage">
      <Link to={"/"}>
        <FaArrowLeft />
        <h2>{id}</h2>
      </Link>
      {imagesFetched ? (
        <Photos
          setOpenModal={setOpenModal}
          setshowPhotoModal={setshowPhotoModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ) : (
        <Loading />
      )}
      {openModal && <PhotoModal setOpenModal={setOpenModal} />}
      {showPhotoModal && idxImage !== -1 && (
        <PhotoSlider setshowPhotoModal={setshowPhotoModal} />
      )}
      {openDeleteModal && (
        <DeleteModal setOpenDeleteModal={setOpenDeleteModal} type="photos" />
      )}
    </div>
  );
};

export default Photopage;
