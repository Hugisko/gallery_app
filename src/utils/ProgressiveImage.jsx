import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProgressiveImage = ({ src, alt, loading, handleClickImage }) => {
  const [loaded, setLoaded] = useState(!loading);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  const pixelatedStyle = {
    filter: loaded ? "none" : "blur(10px)",
    imageRendering: loaded ? "auto" : "pixelated",
    width: "100%",
    height: "100%",
    transition: "filter 0.8s ease-in-out, image-rendering 0.8s ease-in-out",
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClickImage}
      loading="lazy"
      style={pixelatedStyle}
    />
  );
};

ProgressiveImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    loading: PropTypes.bool,
    handleClickImage: PropTypes.func
}


export default ProgressiveImage;
