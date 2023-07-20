import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./features/counter/counter-slice";
import { itemReducer } from "./features/counter/item-slice";

export const store = configureStore({
    reducer:{
        counter: counterReducer,
        item: itemReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>