import { configureStore } from "@reduxjs/toolkit";
import {MovieReducer} from './MovieDetail'
export const store = configureStore({
    reducer:{
        // child reducer
        MovieReducer,
    }
})