import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "../../../models/userSlice";

export const userSlice = createSlice ({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        resetUser: () => {
            return userInitialState;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;