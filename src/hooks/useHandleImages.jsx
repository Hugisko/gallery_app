import { useState } from "react";

const useHandleImages = () => {
    const [images, setImages] = useState([]);

    const addImages = (files) => {
        for (let index = 0; index < files.length; index++) {
          if (files[index].type.split("/")[0] !== "image") continue;
          if (!images.some((e) => e.name === files[index].name)) {
            setImages((prevImages) => [
              ...prevImages,
              {
                name: files[index].name,
                url: URL.createObjectURL(files[index]),
                file: files[index],
              },
            ]);
          }
        }
      };
    
      const selectImages = (e) => {
        const files = e.target.files;
        addImages(files);
      };
    
      const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        addImages(files);
      };
    
      const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      };
    
      const onDragLeave = (e) => {
        e.preventDefault();
      };

  return {images,setImages,selectImages,onDragOver,onDragLeave,onDrop};
}

export default useHandleImages;