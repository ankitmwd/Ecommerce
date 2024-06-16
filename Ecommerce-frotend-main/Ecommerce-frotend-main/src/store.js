import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducers/ProductReducer";
import AuthenticationReducer from "./Reducers/AuthenticationReducer";
import CardReducer from "./Reducers/CardReducer";
const store = configureStore({
    reducer: {
        ProductReducer: ProductReducer,
        AuthenticationReducer: AuthenticationReducer,
        CardReducer:CardReducer
        
    }
})
export default store;