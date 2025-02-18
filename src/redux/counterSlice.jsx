import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
} 

let counterSlice = createSlice({
    name: 'Counter',
    initialState,
    reducer: {
        increase: (state, action)=>{
            state.count++
        },
        decrease: (state, action)=>{
            state.count--
        }
    }
})

const counterReducer = counterSlice.reducer;

export default counterReducer;
export let {increase,decrease} = counterSlice.actions;