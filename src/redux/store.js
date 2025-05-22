import { configureStore } from "@reduxjs/toolkit"
import countSlice from "./slices/counterSlice"
import postSlice from "./slices/ApiSlice"

const store = configureStore({
    reducer:{
        counter:countSlice,
        posts:postSlice
    }
})


export default store;