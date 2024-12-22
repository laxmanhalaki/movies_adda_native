import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Theme from '../utiliteis';
import { ImgBaseUrl } from '../API/Client';
import { useSelector } from 'react-redux';
import { searchMovie } from '../API/ApiHandler';

const MoviesPopup = ({ setEnableSearch }) => {
	const { hindiMovies } = useSelector((state) => state.MovieSlice);
	const [results, setResults] = useState(hindiMovies);
	const [searchKey, setSearchKey] = useState('');
	const [pgNo, setPageNo] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const stringRef = useRef();
	stringRef.current = searchKey;
	useEffect(() => {
		getMovies();
	}, [searchKey]);
	const getMovies = async (pgNo) => {
		setIsLoading(true);
		if (stringRef.current.length > 0) {
			pgNo ? setPageNo(pgNo + 1) : setPageNo(1);
			const response = await searchMovie(stringRef.current, pgNo);
			pgNo
				? setResults([...results, ...response.data.results])
				: setResults(response.data.results);
		} else {
			return null;
		}
		setIsLoading(false);
	};
	const handleScroll = () => {
		
		isLoading ? null : getMovies(pgNo);
	};
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'rgba(0,0,0,0.4)',
				position: 'absolute',
				zIndex: 20,
				paddingVertical: 15,
				paddingHorizontal: 5,
				height: '100%',
				width: '100%',
			}}
		>
			<View
				style={{
					padding: 6,
					width: '100%',
					height: '100%',
					backgroundColor: Theme.black,
				}}
			>
				<View
					style={{
						alignSelf: 'flex-end',
						backgroundColor: 'white',
						paddingHorizontal: 10,
						paddingVertical: 4,
						borderRadius: 6,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 6,
					}}
				>
					<TextInput
						placeholder="Search Movies Here"
						value={searchKey}
						onChangeText={(text) => setSearchKey(text)}
					/>
					<TouchableOpacity
						style={{ paddingLeft: 4 }}
						onPress={() => setEnableSearch(false)}
					>
						<Feather name="x" size={18} />
					</TouchableOpacity>
				</View>
				<FlatList
					data={results}
					numColumns={3}
					ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
					renderItem={({ item }) => {
						return (
							<View style={{ flex: 1, paddingHorizontal: 2 }}>
								<Image
									source={
										item.poster_path
											? { uri: ImgBaseUrl + item.poster_path }
											: require('../assets/no_image.svg.png')
									}
									style={{ height: 180, width: '100%' }}
								/>
							</View>
						);
					}}
					onEndReachedThreshold={0}
					onEndReached={({ distanceFromEnd }) => {
						handleScroll();
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({})

export default MoviesPopup;
