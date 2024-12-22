import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Theme, { primarycolor } from '../utiliteis';
import Header from '../Components/Header';
import HeroSection from '../Components/HeroSection';
import Categories from '../Components/Categories';
import MovieSlider from '../Components/MovieSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getHindiMovies, getKannadaMovies, getTamilMovies, getTelaguMovies } from '../Redux/ThunkCalls/MovieThunk';
import Loader from '../Components/Loader';

const Home = () => {
	  const dispatch = useDispatch();

		const [category, setCategory] = useState('movie');
		
		useEffect(() => {
			dispatch(getHindiMovies(category));
			dispatch(getKannadaMovies(category));
			dispatch(getTelaguMovies(category));
			dispatch(getTamilMovies(category));
		}, [category]);
			const { hindiMovies, telaguMovies, kannadaMovies, tamilMovies } =
				useSelector((state) => state.MovieSlice);
			
			let currentMovie = hindiMovies.length > 0 ? hindiMovies[0] : '';
	return (
		<>
			{currentMovie ? (
				<View
					style={{
						flex: 1,
						backgroundColor: Theme.secondary,
						paddingBottom: 60,
					}}
				>
					<Header />
					<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
						<HeroSection currentMovie={currentMovie} />
						<Categories />
						<MovieSlider data={hindiMovies} title={'Hindi Movies'} code='hi'/>
						<MovieSlider data={kannadaMovies} title={'Kannada Movies'} code='kn' />
						<MovieSlider data={telaguMovies} title={'Telagu Movies'} code='te' />
						<MovieSlider data={tamilMovies} title={'Tamil Movies'} code='ta'/>
					</ScrollView>
				</View>
			) : (
				<Loader />
			)}
		</>
	);
}

const styles = StyleSheet.create({})

export default Home;
