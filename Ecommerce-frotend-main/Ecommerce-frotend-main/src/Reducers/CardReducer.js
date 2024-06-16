import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const GetAllCard = createAsyncThunk("GetAllCard", async (data) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/product/card/${data}`);
        return response;
    } catch (error) {
        console.log(error);
    }
});
export const AddToCardThunk = createAsyncThunk("AddToCardthunk", async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/product/card`, data);
        return response;
    } catch (error) {
        console.log(error);
    }
});
export const UpdateTheCard = createAsyncThunk("UpdateTheCard", async ({ id, required }) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_ENDPOINT}/v1/product/card/update/${id}`, { required });
        return response;
    } catch (error) {
        console.log(error);
        
    }
});
export const DeleteTheCard = createAsyncThunk("DeleteTheCard", async ({ id }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_ENDPOINT}/v1/product/card/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        
    }
});
export const CardReducer = createSlice({
    name: "CardReducer",
    initialState: {
        loading: false,
        err: null,
        CardArr: [],
        total:0,
    },
    reducers: {
        SetTotal(state, action) {
            console.log(action.payload);
            state.total = action.payload + state.total;
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllCard.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(GetAllCard.fulfilled, (state, action) => {
            state.loading = false;
            state.CardArr = action.payload?.data;
        });
        builder.addCase(GetAllCard.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
         builder.addCase(AddToCardThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(AddToCardThunk.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.data === "user Not found") {
                toast.error("Login First");
            }
            else if (action.payload?.data === "exists") {
                toast.error("Already Exists");
            }
            else if (action.payload?.data) {
                state.CardArr.push(action.payload?.data);
                console.log(action.payload.data);
                toast.success("Added To Card");
            }
            else {
                toast.error("Server Error");

            }

        });
        builder.addCase(AddToCardThunk.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
         builder.addCase(UpdateTheCard.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(UpdateTheCard.fulfilled, (state, action) => {
            if (action.payload?.data) {
                for (let i = 0; i < state.CardArr.length; i++){
                    if (state.CardArr[i]._id === action.payload.data._id) {
                        state.CardArr[i] = action.payload.data;
                    }
                }
            }
            state.loading = false;
            
        });
        builder.addCase(UpdateTheCard.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
         builder.addCase(DeleteTheCard.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(DeleteTheCard.fulfilled, (state, action) => {
            if (action.payload?.data) {
                state.CardArr = state.CardArr.filter((val, ind) => {
                    return state.CardArr[ind]._id !== action.payload.data._id;
            })
            }
            console.log(state.CardArr);
            state.loading = false;
            
        });
        builder.addCase(DeleteTheCard.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
        
    }
    
});
export const { SetTotal } = CardReducer.actions;
export default CardReducer.reducer;