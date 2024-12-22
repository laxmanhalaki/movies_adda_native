import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from '../utiliteis';
import HomeNavigation from './StackNavigation';

const Tab = createBottomTabNavigator();


export default function BottomNavigation() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: Theme.white,
				tabBarInactiveBackgroundColor: Theme.primary,
				headerShown: false,
				tabBarStyle: {
					height: 60,
					paddingHorizontal: 5,
					paddingTop: 0,
					backgroundColor: Theme.primary,
					position: 'absolute',
					borderTopWidth: 0,
					paddingBottom: 4,
				},
			}}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeNavigation}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
				}}
				header={false}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="user" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
