import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getMovies } from "../../API/ApiHandler";

const getHindiMovies=createAsyncThunk('popular',async (category)=>{
    const response=await getMovies(1,'hi');
    
    try {
        return response.data.results;
    } catch (error) {
        console.log('error while fetching popular movies',error)
    }

});
const getKannadaMovies=createAsyncThunk('upcoming',async (category)=>{
    const response = await getMovies(1, 'kn');
    try {
        return response.data.results;
    } catch (error) {
        console.log('error while fetching upcoming movies',error)
    }

})

const getTelaguMovies=createAsyncThunk('toprated',async (category)=>{
    const response = await getMovies(1, 'te');
    try {
        return response.data.results;
    } catch (error) {
        console.log('error while fetching toprated movies',error)
    }

})
const getTamilMovies=createAsyncThunk('tamil',async (category)=>{
    const response = await getMovies(1, 'ta');
    try {
        return response.data.results;
    } catch (error) {
        console.log('error while fetching toprated movies',error)
    }

})
export {
    getHindiMovies,
    getKannadaMovies,
    getTelaguMovies,
    getTamilMovies

}