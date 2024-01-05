import "./addCard.css";
import { CgAddR } from "react-icons/cg";
import PropTypes from 'prop-types';

const AddCard = ({ setOpenModal, title }) => {
  return (
    <div className="addCard card flex-center-col" onClick={() => setOpenModal(true)}>
      <CgAddR />
      <p>{title}</p>
    </div>
  );
}

AddCard.propTypes = {
  setOpenModal: PropTypes.func,
  title: PropTypes.string
};

export default AddCard;
