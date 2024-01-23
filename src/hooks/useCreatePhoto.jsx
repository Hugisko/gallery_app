import { useEffect, useState } from "react";
import {API_BASE_URL} from '../constants/constant';

const useCreatePhoto = (images, setUpdatedPhotos, setOpenModal,setErrorMsg,path) => {
    const [isCreating, setIsCreating] = useState(false);
    useEffect(()=>{
        const createPhoto = async () => {
            const formData = new FormData();
            images.forEach((img, index) => {
            formData.append(`image${index + 1}`, img.file);
            });
    
            const option = {
            method: "POST",
            body: formData,
            };
    
            try {
            const response = await fetch(`${API_BASE_URL}/gallery/${path}`, option);
            if (response.status === 200 || response.status === 201) {
                const result = await response.json();
                console.log("Images uploaded:", result);
                setUpdatedPhotos(true);
                setOpenModal(false);
            } else if (response.status === 400) {
                setErrorMsg("Neplatná žiadosť");
                throw new Error("Invalid request - file not found.");
            } else if (response.status === 404) {
                setErrorMsg("Galéria neexistuje");
                throw new Error("Gallery not found.");
            } else {
                setErrorMsg("Chyba");
                throw new Error("Unknown Error");
            }
            } catch (error) {
            console.error(error.message);
            }
        } 

        if(isCreating){
            createPhoto();
        }
    
    },[isCreating])

  return setIsCreating;
}

export default useCreatePhoto;