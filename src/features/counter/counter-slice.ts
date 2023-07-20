import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState{
        value:number;
}

const initialState: CounterState = {
        value:0,
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value += 1
        },
        incrementAmount:(state, action: PayloadAction<number>)=>{
            state.value += action.payload
        }
    }
})

export const {increment, incrementAmount} = counterSlice.actions;
export const counterReducer = counterSlice.reducer;