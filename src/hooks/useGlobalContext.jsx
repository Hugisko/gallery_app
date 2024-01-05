import { AppContext } from "../context/Context";
import { useContext } from "react";

export const useGlobalContext = () => {
    return useContext(AppContext);
  };