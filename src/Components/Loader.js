import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Theme from '../utiliteis';

const Loader = () => {
	return (
		<View style={{flex:1,height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:Theme.primary}}>
		<Image source={require('../assets/loader.png')} style={{height:200,width:200,objectFit:'contain'}} />
		<Text style={{paddingTop:8,color:Theme.white}}>Loading...</Text>
			
		</View>
	);
}

const styles = StyleSheet.create({})

export default Loader;
