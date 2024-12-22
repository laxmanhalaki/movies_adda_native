import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Theme from '../utiliteis';
import MoviesPopup from './MoviesPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
	const [enableSearch,setEnableSearch]=useState(false);
	return (
		<>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: 8,
					backgroundColor: Theme.primary,
					justifyContent:'space-between'
				}}
			>
				<Image
					source={require('../assets/logo.png')}
					style={{ height: 50, resizeMode: 'contain', width: 200 }}
				/>
				<TouchableOpacity style={{marginRight:15}} onPress={()=>setEnableSearch(true)}>
					<FontAwesome name="search" size={22} color="white" />
				</TouchableOpacity>
			</View>
			{enableSearch && <MoviesPopup setEnableSearch={setEnableSearch} />}
		</>
	);
}

const styles = StyleSheet.create({})

export default Header;
