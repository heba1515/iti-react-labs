import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";


const myStore = configureStore({
    reducer: {
        "counter": counterReducer
    }
});

export default myStore;