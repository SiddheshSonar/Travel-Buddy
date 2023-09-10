
import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
    name: "chat",
    initialState: {
        user: null,
        isOpen: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        toggleChat: (state, action) => {
            state.isOpen = action.payload;
        }
    }
});

export const chatReducer = chat.reducer;

export const { setUser, toggleChat } = chat.actions;