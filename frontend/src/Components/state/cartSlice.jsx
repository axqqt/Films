import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: 0,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state += action.payload;
    },
    removeItem: (state, action) => {
      state += action.payload;
    },
  },
});

export const { addItem, removeItem } = priceSlice.actions;

export default priceSlice.reducer;
