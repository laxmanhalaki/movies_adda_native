import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigation from './src/Navigation/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import LoginPage from './src/Screens/LoginPage';
export const accessContext = createContext();
export default function App() {
	const [validUser, setValidUser] = useState(true);

	return (
		<Provider store={store}>
			<accessContext.Provider value={{ validUser, setValidUser }}>
				{validUser ? (
					<NavigationContainer>
						<BottomNavigation />
					</NavigationContainer>
				) : (
					<LoginPage />
				)}
				{/* */}
			</accessContext.Provider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
