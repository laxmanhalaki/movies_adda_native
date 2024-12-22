import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { accessContext } from '../../App';
import { useDispatch } from 'react-redux';
import { userLogin, userSignUP } from '../API/ApiHandler';
import { setLoginUser } from '../Redux/MovieSlice';
import { addToken, getToken } from '../AsyncStorage';
import { ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import Loader from '../Components/Loader';

const LoginPage = () => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const dispatch = useDispatch();
	const { setValidUser} = useContext(accessContext);
	const [login, setLogin] = useState(true);
	const [secure, setSecure] = useState(true);
	const [error, setError] = useState('');
	const [loader,setLoader]=useState(true);
	const userSignIn = async () => {
		if (user.username.length == 0) {
			setError(1);
		} else if (user.password.length == 0) {
			setError(2);
		} else {
			setLoader(true);
			
			
			const response = await userLogin(user);
			if (response.status == 200) {
				if (response.data.token) {
					Promise.resolve(
						addToken(response.data.token)
					).then(() => setValidUser(true));
					dispatch(setLoginUser(response.data.user));
				}
			} else {
				Alert.alert('please verify your credentials');
			}
			setLoader(false);
		}
	};
	const userSignUp = async () => {
		if (user.username.length == 0) {
			setError(1);
		} else if (user.email.length == 0) {
			setError(3);
		} else if (user.password.length == 0) {
			setError(2);
		} else {
			try {
				const response = await userSignUP(user);
				if (response.status == 200) {
					Alert.alert('Your Account Registered Successfully');
					setLogin(true);
				} else {
					Alert.alert('Error while registering your account');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
		useEffect(() => {
			autoLogin();
		}, []);
		const autoLogin = async () => {
		console.log('auto login called')
			setLoader(true);
			let Token = await getToken();
			console.log('token from storage got',Token)
			if(Token){
			const response = await userLogin();
			console.log('token i got', response.data.token);
			if (response.data.token) {
				dispatch(setLoginUser(response.data.user));
				setValidUser(true);
			}
		}
		console.log('auto login called2');
			setLoader(false);
		};
	return (<>{
		loader?<Loader />:<ImageBackground
			source={{
				uri: 'https://png.pngtree.com/thumb_back/fw800/background/20240109/pngtree-a-compelling-movie-poster-background-image_15605697.jpg',
			}}
			style={styles.background}
			imageStyle={styles.backgroundImage}
		>
			<View style={styles.overlay}>
				{login ? (
					<View
						style={{
							paddingHorizontal: 25,
							paddingVertical: 15,
							borderRadius: 10,
							backgroundColor: 'rgba(0,0,0,0.6)',
							width: '100%',
						}}
					>
						<Text
							style={{
								color: 'white',
								fontWeight: '600',
								fontSize: 20,
								paddingVertical: 8,
							}}
						>
							Sign In
						</Text>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderRadius: 6,
								borderColor: 'white',
								marginVertical: 10,
								width: '100%',
							}}
						>
							<TextInput
								placeholder="Username"
								placeholderTextColor="white"
								onChangeText={(e) => {
									setUser({ ...user, username: e });
								}}
								value={user.username}
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									color: 'white',
								}}
								keyboardType="visible-password"
							/>
						</View>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderRadius: 6,
								borderColor: 'white',
								marginVertical: 10,
								width: '100%',
							}}
						>
							<TextInput
								placeholder="Password"
								placeholderTextColor="white"
								onChangeText={(e) => {
									setUser({ ...user, password: e });
								}}
								secureTextEntry={secure}
								value={user.password}
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									flex: 1,
									color: 'white',
								}}
							/>
							<TouchableOpacity
								style={{ marginRight: 10 }}
								onPress={() => setSecure(!secure)}
							>
								{secure ? (
									<FontAwesome name="eye-slash" size={22} color="white" />
								) : (
									<FontAwesome name="eye" size={22} color="white" />
								)}
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={{
								backgroundColor: 'orangered',
								paddingVertical: 10,
								paddingHorizontal: 12,
								borderRadius: 6,
								marginTop: 15,
							}}
							onPress={userSignIn}
						>
							<Text
								style={{ color: 'white', fontSize: 18, textAlign: 'center' }}
							>
								Sign In
							</Text>
						</TouchableOpacity>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								marginVertical: 8,
							}}
						>
							<Text style={{ fontSize: 14, color: 'white' }}>
								New to Film Adda ?&nbsp;
							</Text>
							<TouchableOpacity onPress={() => setLogin(false)}>
								<Text
									style={{ fontWeight: '600', fontSize: 14, color: 'white' }}
								>
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View
						style={{
							paddingHorizontal: 25,
							paddingVertical: 15,
							borderRadius: 10,
							backgroundColor: 'rgba(0,0,0,0.6)',
							width: '100%',
						}}
					>
						<Text
							style={{
								color: 'white',
								fontWeight: '600',
								fontSize: 20,
								paddingVertical: 8,
							}}
						>
							Sign Up
						</Text>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderRadius: 6,
								borderColor: 'white',
								marginVertical: 10,
								width: '100%',
							}}
						>
							<TextInput
								placeholder="Username"
								placeholderTextColor="white"
								onChangeText={(e) => {
									setUser({ ...user, username: e });
								}}
								value={user.username}
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									color: 'white',
								}}
								keyboardType="visible-password"
							/>
						</View>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderRadius: 6,
								borderColor: 'white',
								marginVertical: 10,
								width: '100%',
							}}
						>
							<TextInput
								placeholder="Email"
								placeholderTextColor="white"
								onChangeText={(e) => {
									setUser({ ...user, email: e });
								}}
								value={user.email}
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									color: 'white',
								}}
							/>
						</View>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderRadius: 6,
								borderColor: 'white',
								marginVertical: 10,
								width: '100%',
							}}
						>
							<TextInput
								placeholder="Password"
								placeholderTextColor="white"
								onChangeText={(e) => {
									setUser({ ...user, password: e });
								}}
								secureTextEntry={secure}
								value={user.password}
								style={{
									paddingHorizontal: 10,
									paddingVertical: 10,
									flex: 1,
									color: 'white',
								}}
							/>
						</View>
						<TouchableOpacity
							style={{
								backgroundColor: 'orangered',
								paddingVertical: 10,
								paddingHorizontal: 12,
								borderRadius: 6,
								marginTop: 15,
							}}
							onPress={userSignUp}
						>
							<Text
								style={{ color: 'white', fontSize: 18, textAlign: 'center' }}
							>
								Sign Up
							</Text>
						</TouchableOpacity>
						<View
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								marginVertical: 8,
							}}
						>
							<Text style={{ fontSize: 14, color: 'white' }}>
								Already Registered to Film Adda ?&nbsp;
							</Text>
							<TouchableOpacity onPress={() => setLogin(true)}>
								<Text
									style={{ fontWeight: '600', fontSize: 14, color: 'white' }}
								>
									Sign In
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</ImageBackground>
	}
	</>
		
	);
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		flex:1,// Adjust height as per your design
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		resizeMode: 'cover', // or 'contain' as per your design
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
		borderRadius: 10,
		padding:25,
		height: '100%',
		width:'100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 18,
		color: '#ffffff',
	},
});

export default LoginPage;
