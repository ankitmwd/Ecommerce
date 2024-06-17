import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const FetchAllProduct = createAsyncThunk("FetchAllproduct", async () => {
    try {
        var response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/product/all`);
        return response;
    }
    catch (e) {
        console.log(e);
    }
});


export const ProductReducer = createSlice({
    name:"GetAllProduct",
    initialState: {
        Arr: [],
        loading: false,
        err: null,
    },
    extraReducers: (builder) => {
        builder.addCase(FetchAllProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(FetchAllProduct.fulfilled, (state, action) => { 
            state.Arr = action.payload?.data;
            state.loading = false;
        })
        builder.addCase(FetchAllProduct.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        })
        
    }
});
export default ProductReducer.reducer;