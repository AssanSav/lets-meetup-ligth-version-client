import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducer";
import toast from "./toast";
import api from "./http/api";

const configure = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), toast, api],
  });
}

export default configure