import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "counter",
  initialState: {
    values: 0, // use singular here
  },
  reducers: {
    increment: (state) => {
      state.values += 1;
    },
    decrement: (state) => {
      state.values -= 1;
    },
    reset: (state) => {
      state.values = 0;
    },
  },
});

export const { increment, decrement, reset } = countSlice.actions;
export default countSlice.reducer;
