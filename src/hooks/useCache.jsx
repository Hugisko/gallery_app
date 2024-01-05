import { useContext } from "react";
import { CacheContext } from "../context/Cache";

export const useCache = () => {
    return useContext(CacheContext);
  };