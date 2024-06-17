import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast";

export const UserLogin = createAsyncThunk("UserLogin", async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/login`, data)
        return response;
    
    } catch (error) {
        console.log(error);
    }
});
export const UserRegister = createAsyncThunk("UserRegister", async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/signup`, data)
        return response;
    
    } catch (error) {
        console.log(error);
    }
});


export const AuthenticationReducer = createSlice({
    name: "AuthenticationReducer",
    initialState: {
        login: false,
        err: null,
        loading: false,
        UserArr: null,
    },
    reducers: {
        SetLogin(state) {
            state.login = true;
        },
        SetLogout(state) {
            state.login = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.UserArr = action.payload?.data;
            if (action.payload?.data?.login == "login") {
                state.login = true;
                Cookies.set("login", String(action.payload.data.id), {
                    expires: 7
                });
                toast.success("Login Successfully")
            }
            else if (action.payload?.data === "notexists") {
                toast.error("Register First");
            }
            else if (action.payload?.data === "notverified") {
                toast.error("verify you Email you Have A email for Verification");
            }
            else {
                toast.error("server error");
            }
            state.loading = false;
        });
        builder.addCase(UserLogin.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
          builder.addCase(UserRegister.pending, (state, action) => {
            state.loading = true;
          });
        builder.addCase(UserRegister.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.data === "exists") {
                toast.error("ALready Exists Your Account");
            }
            else if (action.payload?.data === "sendMail") {
                toast.success("Your Received A Mail For verification");
            }
            else {
                toast.error("Server Error");
            }
        })
        builder.addCase(UserRegister.rejected, (state, action) => {
            state.err = action.payload;
            state.loading = false;
        });
    }
}
);
export const { SetLogin, SetLogout } =AuthenticationReducer.actions;
export default AuthenticationReducer.reducer;