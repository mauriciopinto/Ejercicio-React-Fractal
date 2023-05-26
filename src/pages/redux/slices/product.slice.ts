import { createSlice } from "@reduxjs/toolkit";
import { productInitialState } from "../../../models/productSlice";

export const productSlice = createSlice ({
    name: "product",
    initialState: productInitialState,
    reducers: {
        createProduct: (state, action) => {
            return action.payload;
        },
        resetProduct: () => {
            return productInitialState;
        }
    }
});

export const { createProduct, resetProduct } = productSlice.actions;