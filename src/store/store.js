import { configureStore } from "@reduxjs/toolkit";
import products from "../Slices/products";



export const store = configureStore({
    reducer:{products}
})