import React from "react";
import "./addCard.css";
import { CgAddR } from "react-icons/cg";

const AddCard = ({ setOpenModal, title }) => {
  return (
    <div className="addCard card flex-center-col" onClick={() => setOpenModal(true)}>
      <CgAddR />
      <p>{title}</p>
    </div>
  );
}

export default AddCard;
