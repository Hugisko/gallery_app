import "./deleteModal.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useCloseModal from "../../hooks/useCloseModal";

const DeleteModal = ({ setOpenDeleteModal, setIsDeleting, title }) => {
  const isClosed = useCloseModal();

  const handleDeleteBtn = () => {
    setIsDeleting(true);
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (isClosed) {
      setOpenDeleteModal(false);
    }
  }, [isClosed, setOpenDeleteModal]);

  return (
    <div className="overlay">
      <div className="deleteModal">
        <form action="">
          <h2>{title}</h2>
          <div className="btn__container flex-center-row">
            <button type="button" onClick={handleDeleteBtn}>
              áno
            </button>
            <button type="button" onClick={() => setOpenDeleteModal(false)}>
              nie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  setOpenDeleteModal: PropTypes.func,
  setIsDeleting: PropTypes.func,
  title: PropTypes.string
};

export default DeleteModal;
