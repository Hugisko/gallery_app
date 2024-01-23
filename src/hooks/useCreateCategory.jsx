import { useEffect, useState } from "react";
import {API_BASE_URL} from '../constants/constant';

const useCreateCategory = (galleryName, setOpenModal, setUpdatedGallery, setErrorMsg) => {
    const [isCreating, setIsCreating] = useState(false);

    useEffect(()=>{
        const createGallery = async () => {
            const option = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: galleryName,
              }),
            };
        
            try {
              const response = await fetch(`${API_BASE_URL}/gallery`, option);
              if (response.status === 201) {
                const result = await response.json();
                console.log("Gallery created:", result);
                setOpenModal(false);
                setUpdatedGallery(true);
              } else if (response.status === 400) {
                const result = await response.json();
                setErrorMsg("Neplatná žiadosť");
                throw new Error(result.description);
              } else if (response.status === 409) {
                setErrorMsg("Galéria s takýmto menom existuje");
                throw new Error("Gallery with this name already exists");
              } else {
                setErrorMsg("Chyba");
                throw new Error("Unknown error");
              }
            } catch (error) {
              console.error(error.message);
            }
          };
          if(isCreating){
            createGallery();
          }
          
    },[isCreating]);
    
    return setIsCreating;
}

export default useCreateCategory;