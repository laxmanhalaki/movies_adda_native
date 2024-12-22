import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Theme from '../utiliteis';
import { useSelector } from 'react-redux';
import { getMovies } from '../API/ApiHandler';
import { ImgBaseUrl } from '../API/Client';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Loader from '../Components/Loader';

const Explore = ({route,navigation}) => {
	const { kannadaMovies } = useSelector((state) => state.MovieSlice);
	const { language } = route.params;
	
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	const fetchData = async () => {
		setIsLoading(true);
		console.log('fetchdata calling');

		try {
			const response = await getMovies(page, language);
			const data = response.data.results;

			setItems((prevItems) => [...prevItems, ...data]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
		
			console.log('erro', error);
		} finally {
			setIsLoading(false);
		}
	};
	// const handleScroll = () => {
	//   if (window.innerHeight + Math.floor(document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isLoading) {
	//     return;
	//   }
	//   fetchData();
	// };

	useEffect(() => {
		setItems([]);
		fetchData();
	}, [language]);



	const handleScroll = () => {
		isLoading ? null : fetchData();
	};
	console.log('is loading', isLoading);
	// original_language;
	return (
		<View
			style={{ flex: 1, backgroundColor: Theme.secondary, paddingBottom: 60 }}
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

			<Text
				style={{
					color: Theme.white,
					fontWeight: '600',
					fontSize: 18,
					padding: 6,
				}}
			>
				Expore More Here
			</Text>
			
				<FlatList
					data={items}
					numColumns={3}
					ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								style={{ flex: 1, paddingHorizontal: 2 }}
								onPress={() =>
									navigation.navigate('Details', {
										language: item.original_language,
										id: item.id,
									})
								}
							>
								<Image
									source={
										item.poster_path
											? { uri: ImgBaseUrl + item.poster_path }
											: require('../assets/no_image.svg.png')
									}
									style={{ height: 180, width: '100%' }}
								/>
							</TouchableOpacity>
						);
					}}
					onEndReachedThreshold={0}
					onEndReached={({}) => {
						handleScroll();
					}}
				/>
		</View>
	);
}

const styles = StyleSheet.create({})

export default Explore;
