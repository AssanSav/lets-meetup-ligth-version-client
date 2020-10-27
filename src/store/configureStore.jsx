import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reducer from './reducer';
import toast from "./toast";
import api from "./middleware/api"

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toast,
      api
    ]
  })
}
