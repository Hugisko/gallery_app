import { useEffect, useState } from "react";

const useCloseModal = () => {
  const [close, setClose] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setClose(true);
      }
    };

    const handleClick = (event) => {
      const overlay = document.querySelector('.overlay');
      if(event.target === overlay){
        setClose(true);
      }
    }

    window.addEventListener("click",handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click",handleClick);
    };
  }, []);
  return close;
};

export default useCloseModal;
