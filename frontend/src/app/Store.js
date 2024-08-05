import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice.js'

const Store = configureStore({
    reducer: userReducer
})

export default Store

