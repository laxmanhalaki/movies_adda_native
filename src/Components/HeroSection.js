// HeroSection.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ImgBaseUrlqty } from '../API/Client';

const HeroSection = ({ currentMovie }) => {
	return (
		<ImageBackground
			source={{
				uri: ImgBaseUrlqty + currentMovie.backdrop_path,
			}}
			style={styles.background}
			imageStyle={styles.backgroundImage}
		>
			<View style={styles.overlay}>
				<Text style={styles.title}>{currentMovie.original_title}</Text>
				<Text style={styles.subtitle}>{currentMovie.overview}</Text>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		width: '100%',
		height: 200, // Adjust height as per your design
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		resizeMode: 'cover', // or 'contain' as per your design
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
		padding: 20,
		borderRadius: 10,
		height:'100%',
		display:'flex',
		width:'100%',
		// alignItems:'center',
		justifyContent:'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 14,
		color: '#ffffff',
	},
});

export default HeroSection;
