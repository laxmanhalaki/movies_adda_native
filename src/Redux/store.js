import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./MovieSlice";
const store=configureStore({
    reducer:{
        MovieSlice
    }
});
export default store;