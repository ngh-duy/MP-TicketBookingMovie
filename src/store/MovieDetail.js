import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieDetail: {},
}

export const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers:{
        setMovieDetail:(state, action)=>{
            state.movieDetail = action.payload;
        }
    }
})
export const {setMovieDetail} = movieSlice.actions;
export const MovieReducer = movieSlice.reducer;