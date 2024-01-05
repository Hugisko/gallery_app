import { useEffect, useState } from "react";

const useCloseModal = () => {
  const [close, setClose] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setClose(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return close;
};

export default useCloseModal;
