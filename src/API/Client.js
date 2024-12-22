import {create} from 'apisauce';
export const ImgBaseUrl='https://image.tmdb.org/t/p/w400/';
export const ImgBaseUrlqty='https://image.tmdb.org/t/p/w1280/';
const api = create({
	baseURL: 'https://api.themoviedb.org/3',
	accept: 'application/json',
});
export default api;
//'https://myadmin-lu8h.onrender.com'
//1280