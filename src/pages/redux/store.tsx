import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slice";
import { AppStore } from "../../models/store";
import { productSlice } from "./slices/product.slice";
import { favoriteSlice } from "./slices/favorite.slice";

export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        favorite: favoriteSlice.reducer
    }
});