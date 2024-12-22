import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Theme from '../utiliteis';
import { accessContext } from '../../App';
import { removeToken } from '../AsyncStorage';
import { Alert } from 'react-native';

const Profile = () => {
	const {loginUser}=useSelector(state=>state.MovieSlice);
	const {setValidUser}=useContext(accessContext);

	const LogoutUser = () => {
		    Alert.alert('Logout Alert', 'are you sure want to logout?', [
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{ text: 'OK', onPress: () => {removeToken('token');
					setValidUser(false);} },
				]);
		
	};

	return (
		<View
			style={{
				flex: 1,
				paddingBottom: 60,
				backgroundColor: Theme.secondary,
				// justifyContent: 'center',
				alignItems: 'center',
				paddingTop: 50,
			}}
		>
			<Image
				source={require('../assets/profile.png')}
				style={{ height: 100, width: 100, borderRadius: 50 }}
			/>
			<Text
				style={{
					color: 'white',
					fontWeight: '600',
					fontSize: 20,
					paddingTop: 8,
				}}
			>
				{/* {loginUser.username} */}
				Demo User
			</Text>
			<Text
				style={{
					color: 'lightgrey',
					fontSize: 16,
					paddingTop: 2,
					marginBottom:40
				}}
			>
				{/* {loginUser.email} */}
				demouser@gmail.com
			</Text>
			{/* <TouchableOpacity
				style={{
					paddingHorizontal: 12,
					paddingVertical: 10,
					borderRadius: 15,
					backgroundColor: 'orangered',
					marginVertical: 15,
					width: '70%',
				}}
				onPress={LogoutUser}
			>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						color: 'white',
						textAlign: 'center',
					}}
				>
					Logout
				</Text>
			</TouchableOpacity> */}
			<View
				style={{
					paddingVertical: 10,
					paddingHorizontal: 20,
					display: 'flex',
					justifyContent: 'flex-start',
					width: '100%',
				}}
			>
				<View>
					<Text style={{ color: Theme.white, fontSize: 16, fontWeight: '600' }}>
						Libraries&Technologies Used
					</Text>
					<Text style={{ color: Theme.white, fontSize: 14, lineHeight: 20 }}>
						React Native, Javascript, Redux Toolkit, Api Sauce, React
						Navigation, React Native Vector Icons
					</Text>
				</View>
				<View style={{ marginTop: 25 }}>
					<Text style={{ color: Theme.white, fontSize: 16, fontWeight: '600' }}>
						Backend Technologies Used
					</Text>
					<Text style={{ color: Theme.white, fontSize: 14, lineHeight: 20 }}>
						Node Js, Express Js, MongooDB, Mongoose,JWT Tokens
					</Text>
				</View>
				<View style={{ marginTop: 25 }}>
					<Text style={{ color: Theme.white, fontSize: 16, fontWeight: '600' }}>
						About Application
					</Text>
					<Text style={{ color: Theme.white, fontSize: 14, lineHeight: 20 }}>
						By using this application you can browse movies available in Hindi,Kannada,Telagu and Tamil.
						Some basic details of movies also available along with this you can play trailer of each movie.This application is using JWT authentication with the help of Reaact native async storage for secure and auto-login.
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({})

export default Profile;
