import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Explore from '../Screens/Explore';
import Details from '../Screens/Details';


const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={Home} />
			{/* <Stack.Screen name="Profile" component={Profile} /> */}
			<Stack.Screen name="Explore" component={Explore} />
			<Stack.Screen name="Details" component={Details} />
		</Stack.Navigator>
	);
}
