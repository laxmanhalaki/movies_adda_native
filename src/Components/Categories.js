import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../utiliteis';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
	const navigation=useNavigation();
	const categories = [
		{
			title: 'Hindi',
			code: 'hi',
		},
		{
			title: 'Kannada',
			code: 'kn',
		},
		{
			title: 'Telagu',
			code: 'te',
		},
		{
			title: 'Tamil',
			code: 'ta',
		},
	];
	return (
		<View style={{paddingVertical:10}}>
		<FlatList
		horizontal={true}
		data={categories}
		style={{gap:10}}
		renderItem={({item})=>{
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Explore', { language: item.code })
					}
				>
					<View
						style={{
							paddingVertical: 6,
							paddingHorizontal: 10,
							borderRadius: 10,
							backgroundColor: Theme.white,
							marginHorizontal: 6,
						}}
					>
						<Text style={{ color: Theme.black, fontWeight: '600' }}>
							{item.title}
						</Text>
					</View>
				</TouchableOpacity>
			);
		}}
		/>
		
		</View>
	);
}

const styles = StyleSheet.create({})

export default Categories;
