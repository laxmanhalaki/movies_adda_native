import { createSlice } from '@reduxjs/toolkit';
import {
	getHindiMovies,
	getTelaguMovies,
	getKannadaMovies,
	getTamilMovies,
} from './ThunkCalls/MovieThunk';

const MovieSlice = createSlice({
	name: 'movie',
	initialState: {
		hindiMovies: [],
		telaguMovies: [],
		kannadaMovies: [],
		tamilMovies: [],
		currentMovie: '',
		loginUser: {},
	},
	reducers: {
		setHomeItem: (state, action) => {
			state.currentMovie = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setLoginUser: (state, action) => {
			state.loginUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getHindiMovies.fulfilled, (state, action) => {
			state.hindiMovies = action.payload;
		});
		builder.addCase(getHindiMovies.rejected, (state, action) => {
			console.log(action.payload);
		});
		builder.addCase(getKannadaMovies.fulfilled, (state, action) => {
			state.kannadaMovies = action.payload;
		});
		builder.addCase(getKannadaMovies.rejected, (state, action) => {
			console.log(action.payload);
		});
		builder.addCase(getTelaguMovies.fulfilled, (state, action) => {
			state.telaguMovies = action.payload;
		});
		builder.addCase(getTelaguMovies.rejected, (state, action) => {
			console.log(action.payload);
		});
		builder.addCase(getTamilMovies.fulfilled, (state, action) => {
			state.tamilMovies = action.payload;
		});
		builder.addCase(getTamilMovies.rejected, (state, action) => {
			console.log(action.payload);
		});
	},
});
export const { setHomeItem, setLoginUser } = MovieSlice.actions;
export default MovieSlice.reducer;
