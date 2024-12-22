import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../utiliteis';
import { FlatList } from 'react-native';
import { ImgBaseUrl } from '../API/Client';
import { useNavigation } from '@react-navigation/native';

const MovieSlider = (props) => {
	const navigation=useNavigation();
	return (
		<View style={{ paddingVertical: 6, paddingHorizontal: 10 }}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 6,
				}}
			>
				<Text
					style={{
						color: Theme.white,
						fontWeight: '600',
						fontSize: 18,
					}}
				>
					{props.title}
				</Text>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Explore', { language: props.code })
					}
				>
					<Text
						style={{
							color: Theme.white,
							fontWeight: '500',
							fontSize: 14,
						}}
					>
						View All
					</Text>
				</TouchableOpacity>
			</View>

			{/* src={item.poster_path ? ImgBaseUrl + item.poster_path : no_image} */}
			<FlatList
				data={props.data}
				horizontal={true}
				ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={{}}
							onPress={() => {
								navigation.navigate('Details', {
									language: item.original_language,
									id: item.id,
								});
							}}
						>
							{/* original_language */}
							<Image
								source={
									item.poster_path
										? { uri: ImgBaseUrl + item.poster_path }
										: require('../assets/no_image.svg.png')
								}
								style={{ height: 180, width: 120 }}
							/>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({})

export default MovieSlider;
