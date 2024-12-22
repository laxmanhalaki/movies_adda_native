import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../utiliteis';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {getMovie} from '../API/ApiHandler';
import { ImgBaseUrl } from '../API/Client';
import Loader from '../Components/Loader';
import MovieSlider from '../Components/MovieSlider';
import Player from '../Components/Player';

const Details = ({navigation,route}) => {
		const [detail, setDetail] = useState();
		const { id, language } = route.params;
		const [player, setPlayer] = useState(false);
		const { kannadaMovies, hindiMovies, telaguMovies, tamilMovies } =
			useSelector((state) => state.MovieSlice);


		useEffect(() => {
			getMovieDetail(id, language);
		}, [id]);
		const getMovieDetail = async (id, language) => {
			try {
				const response = await getMovie(id, language);
				setDetail(response.data);
			} catch (error) {
				console.log('error i got', error);
			}
		};
		const getRelatedData = useCallback(() => {
			if (language == 'te') {
				return telaguMovies;
			} else if (language == 'kn') {
				return kannadaMovies;
			} else if (language == 'hi') {
				return hindiMovies;
			} else if (language == 'ta') {
				return tamilMovies;
			} else {
				return [];
			}
		}, [language]);
	
	return (
		<>
			{detail ? (
				<View
					style={{
						flex: 1,
						backgroundColor: Theme.secondary,
						paddingBottom: 60,
						paddingHorizontal: 6,
					}}
				>
					<TouchableOpacity
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							padding: 8,
						}}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="arrow-back" size={20} color="white" />
						<Text style={{ color: 'white', fontSize: 16, marginLeft: 6 }}>
							Back
						</Text>
					</TouchableOpacity> 
					<ScrollView style={{ paddingTop: 6, paddingHorizontal: 10, flex: 1 }}>
						<Image
							source={{
								uri: ImgBaseUrl + detail.poster_path,
							}}
							style={{ width: '100%', height: 320, resizeMode: 'contain' }}
						/>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingTop: 10,
							}}
						>
							<Text
								style={{
									color: 'white',
									fontWeight: '600',
									fontSize: 25,
									flex: 1,
								}}
							>
								{detail.title}
							</Text>
							<Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
								{Math.floor(detail.vote_average)}&nbsp;&nbsp;
								<FontAwesome name="star" color="yellow" size={20} />
							</Text>
						</View>
						<Text
							style={{ paddingTop: 5, color: Theme.lightgrey, fontSize: 14 }}
						>
							{detail.release_date} |&nbsp;&nbsp;
							{`${Math.floor(detail.runtime / 60)} h ${
								detail.runtime % 60
							} min`}{' '}
							| 16+
						</Text>
						<View style={{ paddingVertical: 8 }}>
							<Text
								style={{
									color: Theme.white,
									fontWeight: '600',
									fontSize: 16,
									paddingBottom: 4,
								}}
							>
								OVERVIEW
							</Text>
							<Text
								style={{ color: Theme.white, fontSize: 14, lineHeight: 18 }}
							>
								{detail.overview}
							</Text>
							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									borderRadius: 8,
									backgroundColor: Theme.white,
									alignSelf: 'flex-start',
									marginVertical: 12,
								}}
								onPress={() => setPlayer(true)}
							>
								<Text>
									<FontAwesome name="play" size={18} />
									&nbsp;&nbsp;Play Trailer
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ paddingVertical: 8 }}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									gap: 12,
								}}
							>
								<Text
									style={{
										color: Theme.lightgrey,
										fontWeight: '400',
										fontSize: 14,
										minWidth: 60,
									}}
								>
									Created By
								</Text>
								<Text
									style={{
										color: Theme.white,
										fontWeight: '400',
										flex: 1,
										fontSize: 14,
									}}
								>
									{detail.production_companies.map((item) => (
										<Text>{item.name + ', '}</Text>
									))}
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									gap: 12,
									paddingVertical: 8,
								}}
							>
								<Text
									style={{
										color: Theme.lightgrey,
										fontWeight: '400',
										fontSize: 14,
										minWidth: 65,
									}}
								>
									Genre
								</Text>
								<Text
									style={{
										color: Theme.white,
										fontWeight: '400',
										flex: 1,
										fontSize: 14,
									}}
								>
									{detail.genres.map((item) => (
										<Text>{item.name + ', '}</Text>
									))}
								</Text>
							</View>
							<MovieSlider data={getRelatedData()} title={'Related Movies'} />
						</View>
					</ScrollView>
					{player && (
						<Player
							setPlayer={setPlayer}
							videos={detail.videos.results.filter(
								(item) => item.type == 'Trailer'
							)}
						/>
					)}
				</View>
			) : (
				<Loader />
			)}
		</>
	);
}

const styles = StyleSheet.create({})

export default Details;
