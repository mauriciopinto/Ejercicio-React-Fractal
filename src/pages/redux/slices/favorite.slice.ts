import { createSlice } from "@reduxjs/toolkit";
import { favoriteInitialState } from "../../../models/favoriteSlice";

export const favoriteSlice = createSlice ({
    name: 'favorite',
    initialState: favoriteInitialState,
    reducers: {
        resetFavorite: (state, action) => {
            return favoriteInitialState;
        },
        addFavorite: (state, action) => {
            console.log (action);
            return {
                count: state.count + 1,
                favoriteProducts: [...state.favoriteProducts, JSON.stringify (action.payload)]
            };
        },
        removeFavorite: (state, action) => {
            return {
                count: state.count - 1,
                favoriteProducts: state.favoriteProducts.filter (product => product !== JSON.stringify (action.payload))
            };
        }
    }
});

export const { resetFavorite, addFavorite, removeFavorite } = favoriteSlice.actions;