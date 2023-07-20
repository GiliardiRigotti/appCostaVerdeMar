import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface itemState{
    name:string;
    amount:number;
    price:number;
}

interface listState{
    list:itemState[];
}

const initialState: listState = {
        list:[],
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers:{
        increment:(state, action: PayloadAction<itemState>)=>{
            state.list.push(action.payload)
        },
        decrement:(state)=>{
            state.list.pop()
        },
        reset:(state)=>{
            state.list = []
        }
    }
})

export const {increment, decrement, reset} = itemSlice.actions;
export const itemReducer = itemSlice.reducer;