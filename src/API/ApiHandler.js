import { getToken } from '../AsyncStorage';
import api from './Client';
import { ACCESS_TOKEN } from '@env';
const MyHeader = {
	headers: {
		Authorization: `Bearer ${ACCESS_TOKEN}`,
	},
};

const getMovies = async (page=1, language='hi') => {
	return api.get(
		`/discover/movie?&page=${page}&with_origin_country=IN&with_original_language=${language}`,
		{},
		MyHeader
	);
};

const getMovie = async (id, language='hi') => {
	return api.get(
		`/movie/${id}?append_to_response=videos&with_origin_country=IN&with_original_language=${language}`,
		{},
		MyHeader
	);
};
const searchMovie = async (query,page=1) => {
	return api.get(
		`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
		{},
		MyHeader
	);
};

const userLogin = async (data) => {
	return api.post(`/login`, data, {
		headers: { Authorization: await getToken() },
	});
};
const userSignUP = (data) => {
	return api.post(`/user`, data);
};

export { getMovies, getMovie, searchMovie, userLogin, userSignUP };

//https://www.youtube.com/watch?v=
