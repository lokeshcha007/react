import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchPosts = createAsyncThunk("fetchPosts", async ()=>{
    const resposne = await  axios.get("https://jsonplaceholder.typicode.com/posts")
    return resposne.data;
})

const postSlice = createSlice({
    name:"posts",
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchPosts.pending , (state)=>{
            state.loading = true,
            state.error = null;
        }),
        builder.addCase(fetchPosts.fulfilled , (state,action)=>{
            state.loading = false,
            console.log("action  " + action);
            console.log("action payload " + action.payload);
            state.items = action.payload;
        }),
        builder.addCase(fetchPosts.rejected, (state , action)=>{
            state.loading = false;
            state.error= action.error.message
        })


    }
})

export default postSlice.reducer;