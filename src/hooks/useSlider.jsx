import { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from './useGlobalContext';

const useSlider = (images) => {
  const { activeImg } = useGlobalContext();
  const [idxImage, setIdxImage] = useState(activeImg.id);
  
  const slideFunction = useCallback((direction) => {
    const length = images.length;
    if (direction === "next") {
      let nextIdx = idxImage + 1;
      if (nextIdx === length) {
        nextIdx = 0;
      }
      setIdxImage(nextIdx);
    } else {
      let nextIdx = idxImage - 1;
      if (nextIdx < 0) {
        nextIdx = length - 1;
      }
      setIdxImage(nextIdx);
    }
  },[idxImage, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        slideFunction("next");
      } else if (e.key === "ArrowLeft") {
        slideFunction("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idxImage, slideFunction]);

  return {idxImage, slideFunction}
}

export default useSlider;